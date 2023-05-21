exports.handler = async (ev, ctx) => {
    const evt = JSON.parse(ev.body);
    const user = evt.user;
    console.log("User: ", user);
    let emailStatus = user.email.endsWith("@nas.veritas.edu.ng") || user.email.endsWith("@veritas.edu.ng");
    console.log("Has Veritas email: ", emailStatus);
    return {
        statusCode: emailStatus ? 200 : 400
    }
}