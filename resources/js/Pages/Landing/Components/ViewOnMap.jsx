import { Link } from "@inertiajs/react";
import React from "react";

export default function ViewOnMap({ longitude, latitude }) {
    return (
        <>
            <div
                className="p-3"
                style={{ boxSizing: "border-box", padding: "1rem" }}
            >
                <div
                    className="px-2 pt-2"
                    style={{
                        boxSizing: "border-box",
                        paddingTop: "0.5rem",
                        paddingRight: "0.5rem",
                        paddingLeft: "0.5rem",
                    }}
                >
                    <a
                        className="d-block border rounded mb-4"
                        href={
                            "https://www.google.com/maps/place/Lumen+Field/@" +
                            latitude +
                            "," +
                            longitude +
                            ",12z"
                        }
                        target="_blank"
                        style={{
                            boxSizing: "border-box",
                            backgroundColor: "transparent",
                            color: "rgb(41, 124, 187)",
                            textDecoration: "none",
                            border: "1px solid rgb(231, 234, 243)",
                            borderRadius: "0.3125rem",
                            display: "block",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <img
                            className="img-fluid"
                            alt="Address-Description"
                            src="https://mytravel.bookingcore.co/themes/mytravel/images/map.jpg"
                            style={{
                                boxSizing: "border-box",
                                borderStyle: "none",
                                verticalAlign: "middle",
                                height: "auto",
                                maxWidth: "100%",
                            }}
                        />
                    </a>
                </div>
            </div>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
html {
  box-sizing: border-box;
  font-family: sans-serif;
  line-height: 1.15;
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  margin: 0px;
  background-color: rgb(255, 255, 255);
  color: rgb(59, 68, 79);
  font-family: Rubik, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
}
`,
                }}
            />
        </>
    );
}
