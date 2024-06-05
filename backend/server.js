import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import Invoice from "./models/invoice.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Api is working");
// });

app.use("/api/user", userRoutes);
app.use("/api/user", productRoute);

// server.js (continued)


app.post("/api/user/generate-invoice", async (req, res) => {
  const { products } = req.body;
  const invoice = new Invoice({ products });
  await invoice.save();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace this URL with your HTML template for the invoice
  const invoiceTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                color: #555;
            }
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
            }
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <img src="https://example.com/logo.png" style="width: 100%; max-width: 300px" />
                                </td>
                                <td>
                                    Date: ${new Date().toLocaleDateString()}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="heading">
                    <td>Product</td>
                    <td>Price</td>
                </tr>
                ${products
                  .map(
                    (product) => `
                    <tr class="item">
                        <td>${product.name}</td>
                        <td>${product.qty} x ${product.rate} = ${product.total}</td>
                    </tr>
                `
                  )
                  .join("")}
                <tr class="total">
                    <td></td>
                    <td>Total: ${products.reduce(
                      (acc, product) => acc + product.total,
                      0
                    )}</td>
                </tr>
            </table>
        </div>
    </body>
    </html>
    `;

  await page.setContent(invoiceTemplate);
  const pdf = await page.pdf({ format: "A4" });
  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length,
  });

  res.send(pdf); 
});

// app.use(verifyEmailRoutes);
//-----------------------------------------------Deployment-----------------------------------------

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
