document.getElementById('yr').textContent = new Date().getFullYear();

/* contact form: sends to your Gmail via FormSubmit, no backend needed */
const form = document.getElementById('contact'), msg = document.getElementById('msg');
form.addEventListener('submit', async e => {
    e.preventDefault();
    msg.className = ''; msg.textContent = 'Sending...';
    try {
        const r = await fetch('https://formsubmit.co/ajax/ashoksiyol45@gmail.com', {
            method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form)
        });
        if (!r.ok) throw 0;
        form.reset(); msg.className = 'ok';
        msg.textContent = 'Message sent. I will reply to your email within 24 hours.';
    } catch {
        msg.className = 'bad';
        msg.innerHTML = 'Could not send. Email me directly at <a href="mailto:ashoksiyol45@gmail.com" style="text-decoration:underline">ashoksiyol45@gmail.com</a>.';
    }
});

/* hero: a network of points that reacts to your cursor */
const cv = document.getElementById('net'), cx = cv.getContext('2d');
let W, H, pts = [], mouse = { x: -999, y: -999 };
/* slow down (not stop) if the device asks for reduced motion */
const speed = matchMedia('(prefers-reduced-motion: reduce)').matches ? .35 : 1;
function size() {
    W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight;
    const n = Math.min(130, Math.floor(W * H / 11000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .6, vy: (Math.random() - .5) * .6 }));
}
function draw() {
    cx.clearRect(0, 0, W, H);
    for (const p of pts) {
        p.x += p.vx * speed; p.y += p.vy * speed;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
    }
    for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 150) { cx.strokeStyle = `rgba(140,110,255,${(1 - d / 150) * .6})`; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); }
        }
        const m = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (m < 180) { cx.strokeStyle = `rgba(77,225,255,${(1 - m / 180) * .7})`; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(mouse.x, mouse.y); cx.stroke(); }
        cx.fillStyle = m < 180 ? '#4de1ff' : 'rgba(190,200,255,.95)';
        cx.beginPath(); cx.arc(a.x, a.y, 2.3, 0, 6.3); cx.fill();
    }
    requestAnimationFrame(draw);
}
addEventListener('resize', size);
cv.parentElement.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
cv.parentElement.addEventListener('pointerleave', () => mouse.x = mouse.y = -999);
size(); draw();