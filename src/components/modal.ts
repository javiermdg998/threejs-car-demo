import type { Object3D, Scene } from "three";
import type { Animation } from "../animations/abstractions/i-animation";
import { WarningAnimation } from "../animations/warning-animation";

export function showColorModal(state: { scene: Scene, animations: Animation[] }, object: Object3D): Promise<string> {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF',
    '#F1C40F', '#8E44AD', '#E67E22',
    '#1ABC9C', '#EC7063', '#2ECC71'
  ];

  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';



    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<h2>Selecciona un color</h2>`;


    const warningButton = document.createElement('button');
    warningButton.innerHTML ='<span class="material-symbols-outlined">warning</span>'
    warningButton.addEventListener('click', () => {
      state.animations.push(new WarningAnimation(object));
      document.body.removeChild(overlay);
      resolve('');
    })

    const grid = document.createElement('div');
    grid.className = 'color-grid';


    colors.forEach(color => {
      const btn = document.createElement('button');
      btn.className = 'color-button';
      btn.style.backgroundColor = color;
      btn.onclick = () => {
        document.body.removeChild(overlay);
        resolve(color);
      };
      grid.appendChild(btn);
    });


    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.body.removeChild(overlay);
        window.removeEventListener('keydown', handleEscape);
        resolve('');
      }
    };
    window.addEventListener('keydown', handleEscape);

    modal.appendChild(grid);
    modal.appendChild(warningButton);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  });
}
