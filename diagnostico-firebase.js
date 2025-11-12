// 🧪 Script de Diagnóstico de Firebase
// Copia y pega este código en la consola del navegador (F12)

console.log('%c🔥 DIAGNÓSTICO DE FIREBASE - CalorApp 🔥', 'background: #FF6B00; color: white; font-size: 16px; padding: 10px;');

// 1. Verificar que Firebase esté cargado
console.log('\n📦 1. Verificando carga de Firebase...');
try {
  if (typeof firebase !== 'undefined') {
    console.log('✅ Firebase global está cargado');
  } else {
    console.log('⚠️ Firebase global no encontrado (normal con imports modulares)');
  }
} catch (e) {
  console.log('⚠️ Firebase global no accesible');
}

// 2. Verificar configuración de Firebase
console.log('\n⚙️ 2. Verificando configuración...');
console.log('Project ID: calorapp-37833');
console.log('Auth Domain: calorapp-37833.firebaseapp.com');

// 3. Verificar estado de autenticación
console.log('\n🔐 3. Estado de autenticación actual...');
// Nota: Para acceder al auth, necesitas importarlo desde tu código
console.log('ℹ️ Ejecuta en consola para ver estado:');
console.log('  import { auth } from "./src/config/firebase.ts";');
console.log('  console.log(auth.currentUser);');

// 4. Verificar dominios autorizados
console.log('\n🌐 4. Dominio actual:');
console.log('  URL:', window.location.href);
console.log('  Hostname:', window.location.hostname);
console.log('  ✅ Debe ser "localhost" o "calorapp-37833.firebaseapp.com"');

// 5. Verificar popups
console.log('\n🪟 5. Verificando capacidad de popups...');
try {
  const popup = window.open('', '_blank', 'width=1,height=1');
  if (popup) {
    popup.close();
    console.log('✅ Los popups están permitidos');
  } else {
    console.log('❌ Los popups están BLOQUEADOS - Habilítalos para este sitio');
  }
} catch (e) {
  console.log('❌ Error al verificar popups:', e.message);
}

// 6. Verificar conexión a internet
console.log('\n🌍 6. Verificando conexión...');
if (navigator.onLine) {
  console.log('✅ Conexión a internet: ACTIVA');
  
  // Probar conexión a Firebase
  fetch('https://firebaseapp.com')
    .then(() => console.log('✅ Conexión a Firebase: OK'))
    .catch(() => console.log('❌ Conexión a Firebase: BLOQUEADA'));
} else {
  console.log('❌ Sin conexión a internet');
}

// 7. Verificar bloqueadores
console.log('\n🛡️ 7. Detectando bloqueadores...');
setTimeout(() => {
  // Si esta request falla, probablemente hay un bloqueador
  fetch('https://www.googletagmanager.com/gtag/js')
    .then(() => console.log('✅ No se detectaron bloqueadores'))
    .catch(() => console.log('⚠️ POSIBLE BLOQUEADOR DE ANUNCIOS DETECTADO'));
}, 100);

// 8. Verificar localStorage
console.log('\n💾 8. Verificando localStorage...');
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('✅ localStorage: FUNCIONAL');
} catch (e) {
  console.log('❌ localStorage: BLOQUEADO (modo incógnito o restricciones)');
}

// 9. Verificar cookies
console.log('\n🍪 9. Verificando cookies...');
if (navigator.cookieEnabled) {
  console.log('✅ Cookies: HABILITADAS');
} else {
  console.log('❌ Cookies: DESHABILITADAS - Necesarias para Firebase Auth');
}

// 10. Resumen
console.log('\n📋 RESUMEN DEL DIAGNÓSTICO');
console.log('═'.repeat(50));

console.log('\n✅ Para que Firebase funcione correctamente necesitas:');
console.log('  1. Popups habilitados');
console.log('  2. Bloqueadores de anuncios desactivados para localhost');
console.log('  3. Cookies habilitadas');
console.log('  4. localStorage accesible');
console.log('  5. Conexión a internet');

console.log('\n📖 Siguiente paso:');
console.log('  - Abre http://localhost:5173/login');
console.log('  - Click en "Continuar con Google"');
console.log('  - Observa los logs en consola (busca 🔵)');

console.log('\n💡 Tip: Si ves "ERR_BLOCKED_BY_CLIENT", desactiva tu bloqueador');
console.log('    Ver: DESACTIVAR_BLOQUEADORES.md para instrucciones');

console.log('\n');
