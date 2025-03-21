// Importar dependencias necesarias
import * as Kalidokit from 'kalidokit';

// Para hacer referencia a archivos HTML en TypeScript/Vite, puedes usar estas técnicas:

// 1. Declarar los módulos para que TypeScript entienda las importaciones de HTML
declare module '*.html' {
  const content: string;
  export default content;
}

// 2. Importar los archivos HTML como URLs (funciona con Vite)
// Esto te dará la URL al archivo HTML después del build
import indexHtmlUrl from '../docs/index.html?url';
import informationHtmlUrl from '../docs/indexInformation.html?url';
import registerHtmlUrl from '../docs/indexRegister.html?url';

// 3. Definir funciones para cargar las páginas
export function cargarPaginaPrincipal() {
  window.location.href = indexHtmlUrl;
}

export function cargarPaginaInformacion() {
  window.location.href = informationHtmlUrl;
}

export function cargarPaginaRegistro() {
  window.location.href = registerHtmlUrl;
}

// 4. Función para navegar entre páginas programáticamente
export function navegarA(pagina: 'principal' | 'informacion' | 'registro') {
  switch(pagina) {
    case 'principal':
      cargarPaginaPrincipal();
      break;
    case 'informacion':
      cargarPaginaInformacion();
      break;
    case 'registro':
      cargarPaginaRegistro();
      break;
  }
}

// Exportar funcionalidades principales
export { Kalidokit };

// Funciones para tu traductor
export function inicializarTraductor() {
  console.log("Inicializando traductor de Lengua de Signos Virtual");
  // Tu código de inicialización
}

// Función para conectar con la cámara
export async function configurarCamara() {
  // Tu implementación para configurar la cámara
  return {
    iniciar: () => console.log("Cámara iniciada"),
    detener: () => console.log("Cámara detenida")
  };
}

// Función para procesar los gestos mediante Kalidokit
export function procesarGestos(datos: any) {
  // Implementación del procesamiento de gestos
  return Kalidokit.Pose.solve(datos, {
    runtime: 'mediapipe',
    filterSpeed: 0.9
  });
}

// Punto de entrada principal
(function main() {
  console.log("Módulo de Traductor de Lengua de Signos Virtual cargado");
  
  // Si estamos en el navegador, podríamos hacer algo con las rutas
  if (typeof window !== 'undefined') {
    // Por ejemplo, agregar listeners para navegación
    document.addEventListener('DOMContentLoaded', () => {
      // Aquí puedes agregar lógica para detectar en qué página estamos
      // y realizar inicializaciones específicas
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('index.html')) {
        console.log('Estamos en la página principal');
        // Inicializar componentes de la página principal
      } else if (currentPath.includes('indexInformation.html')) {
        console.log('Estamos en la página de información');
        // Inicializar componentes de la página de información
      } else if (currentPath.includes('indexRegister.html')) {
        console.log('Estamos en la página de registro');
        // Inicializar componentes de la página de registro
      }
    });
  }
})();