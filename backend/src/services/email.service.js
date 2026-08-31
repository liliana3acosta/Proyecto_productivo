// Servicio de correo. Por ahora es un "mock": solo imprime en consola.
// Para enviar correos de verdad, instala nodemailer y reemplaza el cuerpo
// de sendEmail() por una llamada a un transporte SMTP real, usando
// credenciales guardadas en variables de entorno (nunca hardcodeadas).
export const sendEmail = async ({ to, subject, text }) => {

    console.log("── Email (simulado) ──");
    console.log("Para:", to);
    console.log("Asunto:", subject);
    console.log("Mensaje:", text);
    console.log("───────────────────────");

    return { success: true, simulated: true };

};

export const enviarConfirmacionOrden = async (usuario, orden) => {

    return await sendEmail({
        to: usuario.email,
        subject: `Confirmación de orden #${orden._id}`,
        text: `Hola ${usuario.nombre}, tu orden por $${orden.total} fue recibida correctamente.`
    });

};

export const enviarConfirmacionCita = async (usuario, cita) => {

    return await sendEmail({
        to: usuario.email,
        subject: "Confirmación de cita",
        text: `Hola ${usuario.nombre}, tu cita para "${cita.servicio}" quedó agendada el ${new Date(cita.fecha).toLocaleDateString()} a las ${cita.hora}.`
    });

};
