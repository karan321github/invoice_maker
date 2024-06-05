import Invoice from "../models/invoice.js";
import puppeteer from "puppeteer";

const addProduct = async (req, res) => {
  try {
    const { products, userDetails } = req.body;
    const invoice = new Invoice({ products, userDetails });
    await invoice.save();

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    const invoiceTemplate = `
    <!DOCTYPE html>
<html>
<head>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&family=Lato:wght@400;700&display=swap');
    body {
      margin: 0;
      font-family: 'Raleway', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #363c43;
      min-height: 100vh;
      background-color: #fff;
    }
    .container {
        width: 80%;
        margin: auto;
        padding: 20px;
        background-color: #ffffff;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .header h1 {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
    }
    .header img {
        width: 100px;
    }
    .sub-header {
        margin-bottom: 20px;
        color: #6c757d;
    }
    .table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    .table th, .table td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }
    .table th {
        background-color: #f2f2f2;
        font-size: 16px;
        font-weight: 700;
    }
    .table td {
        font-size: 14px;
    }
    .table td:nth-child(2) {
        color: #6a5acd;
    }
    .totals {
        float: right;
        width: 30%;
        margin-top: 20px;
    }
    .totals h2, .totals p {
        margin: 0;
        font-size: 16px;
    }
    .totals p {
        color: #6c757d;
    }
    .totals h2 span {
        color: #6a5acd;
    }
    .terms {
        margin-top: 20px;
        font-size: 12px;
        color: #6c757d;
    }
   
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>INVOICE GENERATOR</h1>
            <img src="logo.png" alt="Logo">
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${products
                  .map(
                    (product) => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>${product.rate}</td>
                        <td>INR ${product.quantity * product.rate}</td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
        <div class="totals">
            <h2>Total: <span>INR ${products.reduce(
              (acc, product) => acc + product.quantity * product.rate,
              0
            )}</span></h2>
            <p>GST: 18%</p>
            <h2>Grand Total: <span>INR ${
              products.reduce(
                (acc, product) => acc + product.quantity * product.rate,
                0
              ) * 0.18
            }</span></h2>
        </div>
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
  } catch (error) {
    res.send(error.message);
  }
};
export default addProduct;
