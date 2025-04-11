const express = require("express");
const winston = require("winston");

const app = express();
const PORT = 3000;

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "calculator-microservice" },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

app.get("/add",(req, res) => {
    try{
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2, req);
        const result = num1 + num2;
        logger.info(`Addition: ${num1} + ${num2} = ${result}`);
        res.json({ status: 200, result });
    }catch(error){
        sendErrorResponse(res, 400, error.message);
    }
   
});

app.get("/substraction",(req, res) => {
    try{
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2, req);
        const result = num1 - num2;
        logger.info(`Subtraction: ${num1} - ${num2} = ${result}`);
        res.json({ status: 200, result });
    }catch(error){
        sendErrorResponse(res, 400, error.message);
    }
   
});

app.get("/multi",(req, res) => {
    try{
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2, req);
        const result = num1 * num2;
        logger.info(`Multiplication: ${num1} * ${num2} = ${result}`);
        res.json({ status: 200, result });
    }catch(error){
        sendErrorResponse(res, 400, error.message);
    }
   
});

app.get("/division",(req, res) => {
    try{
        const num1 = parseFloat(req.query.num1);
        const num2 = parseFloat(req.query.num2);
        validateNumbers(num1, num2, req);
        if(num2 === 0){
            const errorMsg = "Divider cannot be zero.";
            logger.error(`Math Error: ${errorMsg} - Request: ${req.url} - Query: ${JSON.stringify(req.query)}`);
            throw new Error(errorMsg);
        }
        const result = num1/num2
        logger.info(`Division: ${num1} / ${num2} = ${result}`);
        res.json({ status: 200, result: result });
    }catch(error){
        sendErrorResponse(res, 400, error.message);
    }
   
});

app.get("/exponentiation", (req, res) => {
    try {
        const num1 = parseFloat(req.query.base);
        const num2 = parseFloat(req.query.exponent);

        validateNumbers(num1, num2, req);

        const result = Math.pow(num1, num2);
        logger.info(`Exponentiation: ${num1} ^ ${num2} = ${result}`);
        
        res.json({ status: 200, result });
    } catch (error) {
        sendErrorResponse(res, 400, error.message);
    }
});

app.get("/square-root", (req, res) => {
    try {
        const number = parseFloat(req.query.number);
        
        if (isNaN(number)) {
            logger.error(`Validation Error: ${errorMsg} - Request: ${req.url} - Query: ${JSON.stringify(req.query)}`);
            throw new Error("Number must be a valid number.");
        }else if (number < 0) {
            throw new Error("Cannot calculate square root of a negative number");
        }
        
        const result = Math.sqrt(number);
        logger.info(`Square Root: √${number} = ${result}`);
        
        res.json({ status: 200, result });
    } catch(error) {
        sendErrorResponse(res, 400, error.message);
    }
});

app.get("/modulo", (req, res) => {
    try {
        const dividend = parseFloat(req.query.dividend);
        const divisor = parseFloat(req.query.divisor);
        
        validateNumbers(dividend, divisor, req);
        
        if (divisor === 0) {
            throw new Error("Modulo by zero is undefined");
        }
        
        const result = dividend % divisor;
        logger.info(`Modulo: ${dividend} % ${divisor} = ${result}`);
        
        res.json({ status: 200, result });
    } catch(error) {
        sendErrorResponse(res, 400, error.message);
    }
});

const validateNumbers = (num1, num2, req) => {
    if (isNaN(num1) || isNaN(num2)) {
        logger.error(`Validation Error: ${errorMsg} - Request: ${req.url} - Query: ${JSON.stringify(req.query)}`);
        throw new Error("Both num1 and num2 must be valid numbers.");
    }
};

const sendErrorResponse = (res, status, message) => {
    res.status(status).json({ status, message });
};

app.listen(PORT, () => console.log(`Calcolator Service is running on port ${PORT}`));