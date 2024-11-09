import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import("./bootstrap");
import("../css/app.css");
import "../css/client_dashboard.css";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: "#2363eb",
        showSpinner: true,
    },
});
