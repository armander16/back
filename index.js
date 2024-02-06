const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
const { body, validationResult } =  require ('express-validator');

validationBodyRules = [
  body('Nombre', 'Nombre es requerido').exists().notEmpty(),
  body('Nombre', 'Nombre no debe tener mas de 50 caracteres').isLength({max: 50}), 
  body('Edad', 'Edad es requerido').exists().notEmpty(),
  body('Edad', 'Edad solo permite numeros').isNumeric(),
  body('Email', 'Email es requerido').exists().notEmpty(),
  body('Email', 'Email debe tener formato  valido').isEmail()
];

checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const snapshot = await User.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});


app.post("/crear",  validationBodyRules, checkRules, async (req, res, next) => {
  
  const data = req.body;
  await User.add({ data });
  res.send({ msg: "Usuario Agregado" });

});

app.listen(4000, () => console.log("server *4000"));
