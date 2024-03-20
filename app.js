document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const wheelRadius = 50;
    let angle = 0;
    let angle_muestra = 0;
    let frame = 0;
    let samplingRate = 20; 

    const drawWheel = (x, y, angle , label) => {
        ctx.beginPath();
        ctx.arc(x, y, wheelRadius, 0, Math.PI * 2);
        ctx.moveTo(x, y);
        ctx.lineTo(x + wheelRadius * Math.cos(angle), y + wheelRadius * Math.sin(angle));
        ctx.stroke();
        ctx.font = '16px Arial'; 
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y - (wheelRadius + 10)); 
    };

    const update = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let muestreo = false;
        drawWheel(200, 200, angle, "Rueda Original");
        if(frame%samplingRate==0)
        {
            // tomo una muestra: 
            angle_muestra = angle;
            muestreo = true;
        }
        drawWheel(600, 200, angle_muestra , "Rueda Muestreada");

        // Dibuja el título general con información del ángulo y el frame
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Ángulo: ${(angle*180/Math.PI % 360).toFixed()} , Frame: ${1+ frame % 60}/60`, canvas.width / 2, 30);
        if (muestreo) {
            ctx.fillText("MUESTREA", canvas.width / 2, 60);
        }

        angle += 2*Math.PI/60; // Velocidad de rotación de la rueda
        ++frame;

    };

    const render = () => {
        update();
        requestAnimationFrame(render);
    };

    document.getElementById('samplingRate').addEventListener('change', (e) => {
        samplingRate = parseInt(e.target.value);
        frame = 0;
        angle = angle_muestra = 0;
    });

    render();
});
