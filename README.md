# 📚 Comparativas App - Domina las Comparativas de Desigualdad en Español

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version 2.0.0">
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT">
  <img src="https://img.shields.io/badge/python-3.8+-orange.svg" alt="Python 3.8+">
  <img src="https://img.shields.io/badge/flask-2.3+-red.svg" alt="Flask 2.3+">
  <img src="https://img.shields.io/badge/bootstrap-5.3-purple.svg" alt="Bootstrap 5.3">
</p>

<p align="center">
  <b>🎯 100 Ejercicios Interactivos • 🏆 Sistema de Medallas • 📊 Estadísticas en Tiempo Real • 👑 Ranking Global</b>
</p>

---

## ✨ **Descripción del Proyecto**

**Comparativas App** es una plataforma educativa interactiva diseñada para ayudar a estudiantes de español a dominar las **comparativas de desigualdad**, específicamente la diferencia entre usar **"de los que"** y **"que"** en construcciones gramaticales.

Con un enfoque **gamificado** y **100 ejercicios prácticos**, los usuarios pueden aprender de manera divertida mientras ganan puntos, desbloquean medallas y compiten en un ranking global.

---

## 🎯 **Características Principales**

### 📚 **Contenido Educativo**
- ✅ **100 ejercicios** organizados en 4 niveles de dificultad
- ✅ **50 flashcards interactivas** para aprendizaje visual
- ✅ Explicaciones detalladas con ejemplos prácticos
- ✅ Pistas contextuales para cada ejercicio
- ✅ Sistema de progreso por categorías

### 🏆 **Gamificación**
- ✅ **Sistema de puntos** con bonus por rachas
- ✅ **15+ medallas desbloqueables** (por categorías, rachas, precisión)
- ✅ **Estrellas** cada 100 puntos acumulados
- ✅ **Rachas** de respuestas correctas
- ✅ **Logros especiales** y celebraciones

### 📊 **Seguimiento**
- ✅ **Dashboard personal** con estadísticas detalladas
- ✅ **Gráficos de progreso** en tiempo real
- ✅ **Historial** de últimos 50 ejercicios
- ✅ **Barra de progreso** por categoría
- ✅ **Círculo de progreso** animado

### 👑 **Social**
- ✅ **Ranking global** con top 20 jugadores
- ✅ **Podio** para los 3 primeros
- ✅ **Perfiles de usuario** personalizables
- ✅ **Compartir logros** en redes sociales

### ⚡ **Pruebas**
- ✅ **Prueba rápida** (5 preguntas - 2 minutos)
- ✅ **Prueba completa** (20 preguntas - 10 minutos)
- ✅ **Desafío experto** (50 preguntas - 30 minutos)
- ✅ **Pruebas personalizadas** por categoría
- ✅ **Temporizador** y corrección automática

---

## 🚀 **Tecnologías Utilizadas**

### **Backend**
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Python | 3.8+ | Lenguaje principal |
| Flask | 2.3+ | Framework web |
| Flask-Login | 0.6+ | Autenticación de usuarios |
| Flask-Session | 0.5+ | Manejo de sesiones |
| Werkzeug | 2.3+ | Utilidades WSGI |

### **Frontend**
| Tecnología | Versión | Uso |
|------------|---------|-----|
| Bootstrap | 5.3 | Framework CSS |
| HTML5 | - | Estructura |
| CSS3 | - | Estilos personalizados |
| JavaScript | ES6 | Interactividad |
| Chart.js | 4.0 | Gráficos |
| AOS | 2.3 | Animaciones |
| SweetAlert2 | 11 | Alertas modernas |

### **Persistencia**
| Tecnología | Uso |
|------------|-----|
| JSON | Base de datos de usuarios y ejercicios |
| LocalStorage | Progreso local del usuario |
| Session | Estado de autenticación |

---

## 📁 **Estructura del Proyecto**
comparativas-app/
│
├── 📄 app.py # Aplicación principal Flask
├── 📄 ejercicios.json # 100 ejercicios organizados
├── 📄 usuarios.json # Datos de usuarios registrados
├── 📄 requirements.txt # Dependencias del proyecto
├── 📄 .gitignore # Archivos ignorados por Git
├── 📄 README.md # Documentación
│
├── 📂 static/ # Archivos estáticos
│ ├── 📂 css/
│ │ └── 🎨 style.css # Estilos personalizados
│ └── 📂 js/
│ └── ⚙️ practica.js # Lógica de la práctica gamificada
│
└── 📂 templates/ # Plantillas HTML
├── 📄 base.html # Plantilla base con navbar y footer
├── 📄 index.html # Página de inicio
├── 📄 login.html # Login y registro
├── 📄 dashboard.html # Dashboard de usuario
├── 📄 teoria.html # Página de teoría
├── 📄 ejemplos.html # Ejemplos con flashcards
├── 📄 practica.html # Práctica gamificada (100 ejercicios)
├── 📄 pruebas.html # Pruebas interactivas
├── 📄 ranking.html # Ranking global
├── 📄 flashcards_todos.html # Flashcards categoría todos
├── 📄 flashcards_fuertes.html # Flashcards verbos fuertes
├── 📄 flashcards_debiles.html # Flashcards verbos débiles
└── 📄 flashcards_mixtos.html # Flashcards casos mixtos

text

---

## 💻 **Instalación y Configuración**

### **Requisitos Previos**
- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Git (opcional, para clonar)

### **Pasos de Instalación**

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/comparativas-app.git
cd comparativas-app
Crear entorno virtual (recomendado)

bash
# En Linux/Mac
python3 -m venv venv
source venv/bin/activate

# En Windows
python -m venv venv
venv\Scripts\activate
Instalar dependencias

bash
pip install -r requirements.txt
Ejecutar la aplicación

bash
python app.py
Abrir en el navegador

text
http://localhost:5000
🎮 Guía de Uso
1. Registro y Primeros Pasos
text
1. Abre la aplicación en http://localhost:5000
2. Haz clic en "Registrarse"
3. Crea un usuario y contraseña
4. ¡Comienza a explorar!
2. Explorar Teoría
text
1. Ve a la pestaña "Teoría"
2. Estudia los conceptos fundamentales
3. Revisa los ejemplos interactivos
4. Practica con la prueba rápida integrada
3. Practicar con Flashcards
text
1. Ve a la pestaña "Ejemplos"
2. Selecciona una categoría
3. Voltea las flashcards para ver la respuesta
4. Marca como aprendidas
5. Sigue tu progreso
4. Práctica Gamificada
text
1. Ve a "Práctica" → "Práctica Gamificada"
2. Selecciona una categoría
3. Responde los ejercicios
4. Gana puntos y medallas
5. Mantén rachas para bonus
5. Evaluar tu Progreso
text
1. Ve a "Práctica" → "Pruebas Rápidas"
2. Elige tipo de prueba
3. Responde dentro del tiempo límite
4. Revisa tus resultados
5. Identifica áreas de mejora
6. Competir en el Ranking
text
1. Ve a "Ranking"
2. Consulta tu posición global
3. Compara estadísticas con otros
4. ¡Sube posiciones practicando!
🏅 Sistema de Medallas
Medalla	Cómo obtenerla	Puntos
🥉 Aprendiz	1000 puntos	100
🥈 Profesional	5000 puntos	200
🥇 Experto	10000 puntos	500
🔥 Racha 10	10 correctas seguidas	50
⚡ Racha 25	25 correctas seguidas	100
👑 Racha 50	50 correctas seguidas	200
📚 Constante	50 ejercicios	100
🎓 Dedicación	100 ejercicios	200
🎯 Precisión 80%	80% aciertos	100
💎 Precisión 90%	90% aciertos	200
🏆 Perfección	100% aciertos	500
🔴 Maestro Fuertes	25 ejercicios cat.1	100
🔵 Maestro Débiles	25 ejercicios cat.2	100
🟠 Experto Mixtos	25 ejercicios cat.3	100
🟣 Especialista	25 ejercicios cat.4	100
📊 API Endpoints
Endpoint	Método	Descripción
/	GET	Página de inicio
/login	GET/POST	Login y registro
/logout	GET	Cerrar sesión
/dashboard	GET	Dashboard usuario
/teoria	GET	Página de teoría
/ejemplos	GET	Flashcards interactivas
/pruebas	GET	Pruebas interactivas
/practica	GET	Práctica gamificada
/ranking	GET	Ranking global
/api/categoria/<id>	GET	Ejercicios por categoría
/api/verificar_ejercicio	POST	Verificar respuesta
/api/estadisticas/usuario	GET	Estadísticas usuario
/api/ranking/top	GET	Top 10 ranking
🧪 Testing
Puedes probar la aplicación con estos usuarios de ejemplo:

python
# Usuario 1 (principiante)
usuario: "estudiante1"
password: "password123"

# Usuario 2 (avanzado)
usuario: "experto"
password: "linguistica123"

# Usuario 3 (para pruebas)
usuario: "test"
password: "test123"
🤝 Cómo Contribuir
Fork el repositorio

Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abre un Pull Request

Guías de Contribución
Mantén el estilo de código existente

Añade comentarios en funciones complejas

Actualiza la documentación si es necesario

Prueba tus cambios localmente

📝 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

text
MIT License

Copyright (c) 2024 Tu Nombre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
👨‍💻 Autor
Tu Nombre

GitHub: @tu-usuario

LinkedIn: Tu Perfil

Twitter: @tu-usuario

Email: tu-email@ejemplo.com

🙏 Agradecimientos
Bootstrap - Por el increíble framework CSS

Flask - Por el microframework web tan elegante

Chart.js - Por los gráficos interactivos

SweetAlert2 - Por las hermosas alertas

Todos los contribuidores - Que ayudaron a mejorar el proyecto

Beta testers - Que probaron la aplicación y dieron feedback

Comunidad de lingüística - Por el apoyo y conocimiento compartido

📞 Contacto
¿Preguntas? ¿Sugerencias? ¿Quieres colaborar?

Email: tu-email@ejemplo.com

GitHub Issues: Abrir issue

Discord: Servidor de comunidad

⭐ Apoya el Proyecto
Si este proyecto te ha sido útil, considera:

Dar una estrella ⭐ en GitHub

Compartir con otros estudiantes

Reportar bugs o sugerir mejoras

Contribuir con código o documentación

<p align="center"> <b>Hecho con ❤️ para la comunidad de estudiantes de español</b> <br> <br> <img src="https://img.shields.io/github/stars/tu-usuario/comparativas-app?style=social" alt="GitHub stars"> <img src="https://img.shields.io/github/forks/tu-usuario/comparativas-app?style=social" alt="GitHub forks"> <img src="https://img.shields.io/github/watchers/tu-usuario/comparativas-app?style=social" alt="GitHub watchers"> </p> ```
