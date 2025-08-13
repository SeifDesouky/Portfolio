import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  private spotlight: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.spotlight = this.renderer.createElement('div');
    this.renderer.addClass(this.spotlight, 'spotlight');
    this.renderer.appendChild(this.el.nativeElement, this.spotlight);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );

    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;
    this.renderer.setStyle(
      this.spotlight,
      'background',
      `radial-gradient(circle at ${mouseXPercent}% ${mouseYPercent}%, rgba(0,255,238,0.25), transparent 60%)`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'rotateX(0) rotateY(0) scale(1)');
    this.renderer.removeStyle(this.spotlight, 'background');
  }
}
