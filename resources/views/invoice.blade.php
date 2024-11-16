<?php
error_reporting(0);
use Carbon\Carbon;
use Illuminate\Support\Number;
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Facture Premium - Exemple</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style type="text/css" media="screen">
        /* General Styles */
        body {
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 14px;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            background: linear-gradient(to bottom, #f4f4f4, #ffffff);
        }

        /* Container */
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        /* Header */
        .header {
            text-align: center;
            padding: 20px 0;
            position: relative;
            border-bottom: 4px solid #1e88e5;
        }

        .header img {
            max-height: 80px;
        }

        .header h1 {
            font-size: 36px;
            margin: 15px 0;
            color: #1e88e5;
            letter-spacing: 1px;
        }

        .badge {
            display: inline-block;
            background-color: #4CAF50;
            color: #ffffff;
            padding: 5px 15px;
            font-size: 12px;
            font-weight: bold;
            border-radius: 20px;
            text-transform: uppercase;
            position: absolute;
            top: 20px;
            right: 20px;
        }

        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 15px;
            border: 1px solid #e0e0e0;
            text-align: left;
        }

        th {
            background-color: #1e88e5;
            color: #ffffff;
            text-transform: uppercase;
            font-size: 14px;
        }

        td {
            background-color: #f9f9f9;
        }

        /* Totals */
        .totals {
            margin-top: 20px;
        }

        .totals .total-label {
            font-weight: bold;
            text-align: right;
            padding: 15px;
        }

        .totals .total-value {
            text-align: right;
            font-weight: bold;
            padding: 15px;
            background-color: #f1f1f1;
        }

        /* Notes */
        .notes {
            font-style: italic;
            color: #777;
        }

        /* Footer */
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top:16px;
            border-top: 1px solid #e0e0e0;
        }

        .payment-method .section-title {
            font-weight: bold;
            font-size: 18px;
            margin-bottom: 15px;
            color: #1e88e5;
        }

        .payment-method .payment-option {
            margin-bottom: 15px;
        }

        .payment-method .masked-input {
            font-size: 16px;
            color: #333;
            background-color: #f1f1f1;
            padding: 10px;
            border: none;
            border-radius: 5px;
        }

        .payment-method .masked-input.card-number {
            letter-spacing: 3px;
        }

        .payment-method .masked-input.bank-account {
            letter-spacing: 2px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBkYXRhLXYtMGRkOTcxOWI9IiIgdmVyc2lvbj0iMS4wIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiIHN0eWxlPSJtYXJnaW46IGF1dG87IiB2aWV3Qm94PSI4MS41OCA2NC42NyAxNzYuODMgMTIwLjY3Ij4KICAgICAgICAgPGcgZGF0YS12LTBkZDk3MTliPSIiIGZpbGw9IiNlNjliNDEiIGNsYXNzPSJpY29uLXRleHQtd3JhcHBlciBpY29uLXN2Zy1ncm91cCBpY29uc3ZnIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MS41ODQ5OTkwODQ0NzI2Niw2NC42NjY1NzI1NzA4MDA3OCkiPgogICAgICAgICAgICA8ZyBjbGFzcz0iaWNvbnN2Zy1pbWFnZXN2ZyIgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLDAsMSw1OC40MTUwMDA5MTU1MjczNDQsMCkiIG9wYWNpdHk9IjEiPgogICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgPHJlY3QgZmlsbD0iI2U2OWI0MSIgZmlsbC1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjIiIHg9IjAiIHk9IjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI3MS4yODY4NDYzODg3MjcxNyIgY2xhc3M9ImltYWdlLXJlY3QiLz4KICAgICAgICAgICAgICAgICAgPHN2ZyBmaWx0ZXI9InVybCgjY29sb3JzMjU5NDI5NDc3NikiIHg9IjAiIHk9IjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI3MS4yODY4NDYzODg3MjcxNyIgZmlsdGVyc2VjPSJjb2xvcnNmMzAwNjk3NTk0NiIgY2xhc3M9ImltYWdlLXN2Zy1zdmcgcHJpbWFyeSIgc3R5bGU9Im92ZXJmbG93OiB2aXNpYmxlOyI+CiAgICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMy43OTk5OTk5NTIzMTYyODQgMCA0MC40MDAwMDE1MjU4Nzg5MDYgNDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogICAgICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI3LjYsOGMtMC4yLTEtMC45LTEuOC0xLjctMi4zYzAuOC0wLjYsMS4zLTEuNSwxLjMtMi42QzI3LjIsMS40LDI1LjgsMCwyNCwwcy0zLjIsMS40LTMuMiwzLjJjMCwxLjEsMC41LDIsMS4zLDIuNiAgIEMyMS4zLDYuMiwyMC42LDcsMjAuNCw4QzExLDkuNywzLjgsMTcuOSwzLjgsMjcuOEMzLjgsMzksMTIuOSw0OCwyNCw0OGMxMS4xLDAsMjAuMi05LDIwLjItMjAuMkM0NC4yLDE3LjksMzcsOS43LDI3LjYsOHogICAgTTI0LDQ1LjFjLTkuNSwwLTE3LjMtNy43LTE3LjMtMTcuM2MwLTkuNSw3LjctMTcuMywxNy4zLTE3LjNzMTcuMyw3LjcsMTcuMywxNy4zQzQxLjMsMzcuNCwzMy41LDQ1LjEsMjQsNDUuMXoiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0LDEyLjVjLTguNCwwLTE1LjMsNi45LTE1LjMsMTUuM1MxNS42LDQzLjIsMjQsNDMuMmM4LjQsMCwxNS4zLTYuOSwxNS4zLTE1LjNTMzIuNCwxMi41LDI0LDEyLjV6IE0xMS42LDI5LjEgICBjLTAuNywwLTEuMy0wLjYtMS4zLTEuM3MwLjYtMS4zLDEuMy0xLjNjMC43LDAsMS4zLDAuNiwxLjMsMS4zUzEyLjMsMjkuMSwxMS42LDI5LjF6IE0yNCwxNC4xYzAuNywwLDEuMywwLjYsMS4zLDEuMyAgIGMwLDAuNy0wLjYsMS4zLTEuMywxLjNjLTAuNywwLTEuMy0wLjYtMS4zLTEuM0MyMi43LDE0LjcsMjMuMywxNC4xLDI0LDE0LjF6IE0yNCw0MS41Yy0wLjcsMC0xLjMtMC42LTEuMy0xLjNzMC42LTEuMywxLjMtMS4zICAgYzAuNywwLDEuMywwLjYsMS4zLDEuM1MyNC43LDQxLjUsMjQsNDEuNXogTTI1LjYsMjkuNEwxNiwzNS44bDYuMy05LjZsOS42LTYuM0wyNS42LDI5LjR6IE0zNi40LDI5LjFjLTAuNywwLTEuMy0wLjYtMS4zLTEuMyAgIHMwLjYtMS4zLDEuMy0xLjNjMC43LDAsMS4zLDAuNiwxLjMsMS4zUzM3LjEsMjkuMSwzNi40LDI5LjF6Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9IjI0IiBjeT0iMjcuOCIgcj0iMS40Ii8+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgPC9zdmc+CiAgICAgICAgICAgICAgICAgIDwvc3ZnPgogICAgICAgICAgICAgICAgICA8ZGVmcz4KICAgICAgICAgICAgICAgICAgICAgPGZpbHRlciBpZD0iY29sb3JzMjU5NDI5NDc3NiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuNDQ1MzEyNSAgMCAwIDAgMCAwLjI5Mjk2ODc1ICAwIDAgMCAwIDAuMjI2NTYyNSAgMCAwIDAgMSAwIiBjbGFzcz0iaWNvbi1mZWNvbG9ybWF0cml4Ii8+CiAgICAgICAgICAgICAgICAgICAgIDwvZmlsdGVyPgogICAgICAgICAgICAgICAgICAgICA8ZmlsdGVyIGlkPSJjb2xvcnNmMzAwNjk3NTk0NiI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuOTk2MDkzNzUgIDAgMCAwIDAgMC45OTYwOTM3NSAgMCAwIDAgMCAwLjk5NjA5Mzc1ICAwIDAgMCAxIDAiIGNsYXNzPSJpY29uLWZlY29sb3JtYXRyaXgiLz4KICAgICAgICAgICAgICAgICAgICAgPC9maWx0ZXI+CiAgICAgICAgICAgICAgICAgICAgIDxmaWx0ZXIgaWQ9ImNvbG9yc2I2MjA0NzI0MzciPgogICAgICAgICAgICAgICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwICAwIDAgMCAwIDAgIDAgMCAwIDAgMCAgMCAwIDAgMSAwIiBjbGFzcz0iaWNvbi1mZWNvbG9ybWF0cml4Ii8+CiAgICAgICAgICAgICAgICAgICAgIDwvZmlsdGVyPgogICAgICAgICAgICAgICAgICA8L2RlZnM+CiAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDc4LjI4Njg0OTk3NTU4NTk0KSI+CiAgICAgICAgICAgICAgIDxnIGRhdGEtZ3JhPSJwYXRoLW5hbWUiIGZpbGwtcnVsZT0iIiBjbGFzcz0idHAtbmFtZSBpY29uc3ZnLW5hbWVzdmciIG9wYWNpdHk9IjEiIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMCwwKSI+CiAgICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ic2NhbGUoMSkiPgogICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIuOTItMjkuNTJMMjEuMTUtMjkuNTIgMjEuMTUtMjQuNzQgOC44NC0yNC43NCA4Ljg0LTE3LjE3IDE4LjI3LTE3LjE3IDE4LjI3LTEyLjQ4IDguODQtMTIuNDggOC44NCAwIDIuOTIgMCAyLjkyLTI5LjUyWk0yNS4zMy0zMS4zTDMxLjI1LTMxLjMgMzEuMjUgMCAyNS4zMyAwIDI1LjMzLTMxLjNaTTUzLjItMjMuNDNMNTkuNTEtMjMuNDMgNDUgMTEuMDggMzguNyAxMS4wOCA0My43Ny0wLjU5IDM0LjM4LTIzLjQzIDQxLjAyLTIzLjQzIDQ3LjA3LTcuMDYgNTMuMi0yMy40M1pNODIuNzMgMEw4MC43OC01LjYzIDY5LjAyLTUuNjMgNjcuMDggMCA2MC44NiAwIDcxLjQ4LTI5LjU2IDc4LjM3LTI5LjU2IDg4Ljk4IDAgODIuNzMgMFpNNzAuNjMtMTAuMzZMNzkuMTctMTAuMzYgNzQuOS0yMi43MSA3MC42My0xMC4zNlpNMTE5Ljc3LTIzLjQzTDEyNS40NC0yMy40MyAxMTguNTkgMCAxMTIuMiAwIDEwNy45My0xNi4zNyAxMDMuNjYgMCA5Ny4yMyAwIDkwLjM0LTIzLjQzIDk2LjM0LTIzLjQzIDEwMC40OS01LjU4IDEwNC45Ny0yMy40MyAxMTEuMjMtMjMuNDMgMTE1LjYzLTUuNjMgMTE5Ljc3LTIzLjQzWk0xMjcuMTMtMTEuOFExMjcuMTMtMTUuMzUgMTI4LjU1LTE4LjEgMTI5Ljk3LTIwLjg1IDEzMi40LTIyLjMzIDEzNC44My0yMy44MSAxMzcuODMtMjMuODFMMTM3LjgzLTIzLjgxUTE0MC40Ni0yMy44MSAxNDIuNDItMjIuNzUgMTQ0LjM5LTIxLjcgMTQ1LjU3LTIwLjA5TDE0NS41Ny0yMC4wOSAxNDUuNTctMjMuNDMgMTUxLjU0LTIzLjQzIDE1MS41NCAwIDE0NS41NyAwIDE0NS41Ny0zLjQzUTE0NC40My0xLjc4IDE0Mi40Mi0wLjcgMTQwLjQxIDAuMzggMTM3Ljc5IDAuMzhMMTM3Ljc5IDAuMzhRMTM0LjgzIDAuMzggMTMyLjQtMS4xNCAxMjkuOTctMi42NiAxMjguNTUtNS40MyAxMjcuMTMtOC4yIDEyNy4xMy0xMS44TDEyNy4xMy0xMS44Wk0xNDUuNTctMTEuNzJRMTQ1LjU3LTEzLjg3IDE0NC43My0xNS40MiAxNDMuODgtMTYuOTYgMTQyLjQ0LTE3Ljc4IDE0MS4wMS0xOC42MSAxMzkuMzYtMTguNjFMMTM5LjM2LTE4LjYxUTEzNy43MS0xOC42MSAxMzYuMzEtMTcuODEgMTM0LjkyLTE3IDEzNC4wNS0xNS40NiAxMzMuMTgtMTMuOTEgMTMzLjE4LTExLjhMMTMzLjE4LTExLjhRMTMzLjE4LTkuNjkgMTM0LjA1LTguMSAxMzQuOTItNi41MSAxMzYuMzMtNS42NyAxMzcuNzUtNC44MiAxMzkuMzYtNC44MkwxMzkuMzYtNC44MlExNDEuMDEtNC44MiAxNDIuNDQtNS42NSAxNDMuODgtNi40NyAxNDQuNzMtOC4wMSAxNDUuNTctOS41NiAxNDUuNTctMTEuNzJMMTQ1LjU3LTExLjcyWk0xNzMuNDQtMjMuNDNMMTc5Ljc1LTIzLjQzIDE2NS4yNCAxMS4wOCAxNTguOTQgMTEuMDggMTY0LjAxLTAuNTkgMTU0LjYyLTIzLjQzIDE2MS4yNi0yMy40MyAxNjcuMzEtNy4wNiAxNzMuNDQtMjMuNDNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMi45MjAwMDAwNzYyOTM5NDUzLCAzMS4yOTk5OTkyMzcwNjA1NDcpIi8+CiAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICAgPCEtLS0tPiA8IS0tLS0+IDwhLS0tLT4gPCEtLS0tPiA8IS0tLS0+IDwhLS0tLT4gPCEtLS0tPgogICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgPCEtLS0tPgogICAgICAgICAgICA8L2c+CiAgICAgICAgIDwvZz4KICAgICAgPC9zdmc+'/>
            <span class="badge">Payée</span>
        </div>

        <!-- Invoice & Seller Info -->
        <table>
            <tr>
                <td>
                    <strong>FlyAway</strong><br>
                    Adresse : 123 Rue Exemple, Paris<br>
                    Code : VND001<br>
                    TVA : FR123456789<br>
                    Téléphone : +33 1 23 45 67 89
                </td>
                <td style="text-align: right;">
                    Série : <strong>{{ Carbon::now()->year }}-{{ Carbon::now()->month }}</strong><br>
                    Date : <strong>{{ Carbon::now()->format('d/m/Y') }}</strong><br>
                </td>
            </tr>
        </table>

        <!-- Client Information -->
        <div class="section-title">Informations Client</div>
        <table>
            <tr>
                <td>
                    <strong>{{ $payment['booking']['client']['user']['firstname'] }} {{ $payment['booking']['client']['user']['lastname'] }}</strong><br>
                    {{ $payment['booking']['client']['address_1'] }}<br>
                    @if(!empty($payment['booking']['client']['address_2']))
                    {{ $payment['booking']['client']['address_2'] }}<br>
                    @endif
                    {{ $payment['booking']['client']['city']['postal_code'] }} {{ $payment['booking']['client']['city']['name'] }}<br>
                    {{ $payment['booking']['client']['city']['region']['name'] }}<br>
                    {{ $payment['booking']['client']['city']['region']['country']['name'] }}<br>
                </td>
            </tr>
        </table>

        <!-- Items Table -->
        <div class="section-title">Détails de la Facture</div>
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th style="text-align: right;">Quantité</th>
                    <th style="text-align: right;"></th>
                    <th style="text-align: right;">Sous-Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Forfait : {{ $payment['booking']['package']['title'] }}</td>
                    <td style="text-align: right;">2</td>
                    <td style="text-align: right;">{{ $payment['booking']['package']['amount_ttc'] }}</td>
                    <td style="text-align: right;">{{ $payment['amount'] }}</td>
                </tr>
            </tbody>
        </table>

        <div class="payment-method">
            <div class="section-title">Méthode de paiement</div>

            @if($payment['paymentable_type'] == 'App\Models\PAYMENT\CreditCard')
            <div class="payment-option">
                <strong>Carte de crédit :</strong>
                <div class="masked-input card-number">**** **** **** {{ substr($payment['paymentable']['card_number'], -4) }}</div>
            </div>
            @else
            <div class="payment-option">
                <strong>Compte bancaire :</strong>
                <div class="masked-input bank-account">{{ substr($payment['paymentable']['iban'], 2) }}** **** **** **** **** {{ substr($payment['paymentable']['iban'], -4) }}</div>
            </div>
            @endif

        </div>

        <!-- Totals -->
        <table class="totals">
            <tr>
                <td class="total-label">Total :</td>
                <td class="total-value">{{ $payment['amount'] }}</td>
            </tr>
            <tr>
                <td class="total-label">Montant en toutes lettres :</td>
                <td class="total-value">{{ Number::spell($payment['amount'] ?? 0, locale: 'fr') }} euros</td>
            </tr>
        </table>

        <!-- Notes -->
        <div class="notes">
            Merci pour votre achat. En cas de question, veuillez nous contacter.
        </div>

        <!-- Footer -->
        <div class="footer">
            &copy; 2024 FlyAway. Tous droits réservés.
        </div>
    </div>
</body>
</html>
