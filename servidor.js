const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
    nombre_mascota: String,
    especie_mascota: String,
    raza_mascota: String,
    peso_mascota: String,
    fecha_nac: String,
    dni_dueño: String
});

const Paciente = mongoose.model("Paciente", pacienteSchema);

const propietarioSchema = new mongoose.Schema({
    nombre_propietario: String,
    dni_propietario: String,
    tel_propietario: String,
    email_propietario: String,
    dir_propietario: String
});

const Propietario = mongoose.model("Propietario", propietarioSchema);

const consultaSchema = new mongoose.Schema({
    paciente_consulta: String,
    fecha_consulta: String,
    motivo_consulta: String,
    sintomas_consulta: String,
    diagnostico_consulta: String
});

const Consulta = mongoose.model("Consulta", consultaSchema);

const vacunaSchema = new mongoose.Schema({
    mascota_vacuna: String,
    producto_vacuna: String,
    fecha_apli: String,
    fecha_prox: String
});

const Vacuna = mongoose.model("Vacuna", vacunaSchema);

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//console.log("URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB conectado");
})
.catch((err) => {
    console.error("Error MongoDB:", err);
});

app.post("/pacientes", async (req, res) => {
    try {
        const paciente = new Paciente(req.body);
        await paciente.save();

        res.status(201).json({
            mensaje: "Paciente guardado correctamente"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/pacientes", async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});
console.log("Ruta POST /pacientes cargada");

app.post("/propietarios", async (req, res) => {
    try {
        const propietario = new Propietario(req.body);
        await propietario.save();
        res.status(201).json(propietario);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/propietarios", async (req, res) => {
    try {
        const propietarios = await Propietario.find();
        res.json(propietarios);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/propietarios/:id", async (req, res) => {
    try {
        const propietario = await Propietario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(propietario);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/propietarios/:id", async (req, res) => {
    try {
        await Propietario.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Propietario eliminado"
        });

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/consultas", async (req, res) => {
    try {
        const consulta = new Consulta(req.body);
        await consulta.save();
        res.status(201).json(consulta);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/consultas", async (req, res) => {
    try {
        const consultas = await Consulta.find();
        res.json(consultas);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/consultas/:id", async (req, res) => {
    try {
        const consulta = await Consulta.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(consulta);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/consultas/:id", async (req, res) => {
    try {
        await Consulta.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Consulta eliminada"
        });

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/vacunaciones", async (req, res) => {
    try {
        const vacuna = new Vacuna(req.body);
        await vacuna.save();
        res.status(201).json(vacuna);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/vacunaciones", async (req, res) => {
    try {
        const vacunas = await Vacuna.find();
        res.json(vacunas);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/vacunaciones/:id", async (req, res) => {
    try {
        const vacuna = await Vacuna.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(vacuna);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/vacunaciones/:id", async (req, res) => {
    try {
        await Vacuna.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Vacuna eliminada"
        });

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/pacientes/:id", async (req, res) => {
    try {

        await Paciente.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Paciente eliminado"
        });

    } catch(error) {

        res.status(500).json({
            error: error.message
        });
    }
});

app.put("/pacientes/:id", async (req, res) => {
    try {

        const paciente = await Paciente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(paciente);

    } catch(error) {

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Servidor iniciado en puerto 3000");
});