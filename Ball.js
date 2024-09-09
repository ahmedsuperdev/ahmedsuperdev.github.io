class Ball {
  constructor(x, y, vx, vy, r, ri=[1, 2], fill) {
    Object.assign(this, {
      x, y,
      vx, vy,
      r, ri,
      fill, ORIGINAL: {r, vx, vy}
    });
    this.radiusUpdate();
  }
  update(ctx) {
    if (this.x + this.r >= cWidth || this.x - this.r <= 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.r >= cHeight || this.y - this.r <= 0) {
      this.vy = -this.vy;
    }

    const x2 = this.x + this.vx;
    
    this.x = x2 + this.r < cWidth ? (x2 - this.r > 0 ? x2 : this.r) : cWidth - this.r;

    const y2 = this.y + this.vy;
    this.y = y2 + this.r < cHeight ? (y2 - this.r > 0 ? y2 : this.r) : cHeight - this.r;
    

    this.#draw(ctx);
  }
  #draw(ctx) {
    ctx.beginPath();
    
    this.ri[0] = mousePos && Math.abs(this.x - mousePos.x) < mouseRadius && Math.abs(this.y - mousePos.y) < mouseRadius ? (this.ri[0] < this.ri[1] ? this.ri[0] + 0.06 : this.ri[1]) : (this.ri[0] - 0.05 > 1 ? this.ri[0] - 0.02 : 1);
    
    
    ctx.arc(this.x, this.y, this.r * this.ri[0], 0, Math.PI * 2, false);
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  radiusUpdate() {
    this.r = sizeFraction >= 2 ? this.ORIGINAL.r * Math.pow(sizeFraction, 0.5) / 1.5: sizeFraction < 0.15 ? this.ORIGINAL.r * Math.pow(sizeFraction, 0.5) / 0.3: this.ORIGINAL.r;
  }
}