from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from flask_session import Session
import json
import os
import hashlib
from datetime import datetime, timedelta
from functools import wraps
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = 'tu_clave_secreta_super_segura_2024'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
app.config['SESSION_PERMANENT'] = True
Session(app)

# Archivos de datos
USUARIOS_FILE = 'usuarios.json'
EJERCICIOS_FILE = 'ejercicios.json'

# ============================================
# FUNCIONES AUXILIARES
# ============================================

def cargar_json(archivo, default):
    """Carga un archivo JSON de manera segura"""
    try:
        with open(archivo, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        with open(archivo, 'w', encoding='utf-8') as f:
            json.dump(default, f, indent=2, ensure_ascii=False)
        return default
    except json.JSONDecodeError:
        return default

def guardar_json(archivo, datos):
    """Guarda datos en un archivo JSON"""
    with open(archivo, 'w', encoding='utf-8') as f:
        json.dump(datos, f, indent=2, ensure_ascii=False)

def hash_password(password):
    """Crea un hash seguro de la contraseña"""
    return hashlib.sha256(password.encode()).hexdigest()

def login_required(f):
    """Decorador para requerir autenticación"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Por favor, inicia sesión para acceder a esta página', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

def get_current_user():
    """Obtiene el usuario actual de la sesión"""
    if 'user_id' not in session:
        return None
    usuarios = cargar_json(USUARIOS_FILE, {"usuarios": []})
    return next((u for u in usuarios['usuarios'] if u['id'] == session['user_id']), None)

# ============================================
# INICIALIZACIÓN DE DATOS
# ============================================

def inicializar_ejercicios():
    """Crea 100 ejercicios si no existen"""
    ejercicios_default = {
        "categorias": [
            {
                "id": 1,
                "nombre": "🌋 Verbos Transitivos Fuertes - Nivel Básico",
                "descripcion": "Verbos que REQUIEREN 'de los que' (encargar, decir, leer, escribir)",
                "nivel": 1,
                "icono": "🔴",
                "color": "danger",
                "ejercicios": []
            },
            {
                "id": 2,
                "nombre": "💧 Verbos Transitivos Débiles - Nivel Básico",
                "descripcion": "Verbos que ADMITEN ambas formas (tener, necesitar, desear, ganar)",
                "nivel": 1,
                "icono": "🔵",
                "color": "primary",
                "ejercicios": []
            },
            {
                "id": 3,
                "nombre": "⚡ Mezcla de Niveles - Intermedio",
                "descripcion": "Combina diferentes tipos de verbos para practicar",
                "nivel": 2,
                "icono": "🟠",
                "color": "warning",
                "ejercicios": []
            },
            {
                "id": 4,
                "nombre": "🎯 Casos Especiales - Avanzado",
                "descripcion": "Casos complejos y excepciones gramaticales",
                "nivel": 3,
                "icono": "🟣",
                "color": "purple",
                "ejercicios": []
            }
        ]
    }
    
    # Verbos por categoría
    verbos = {
        1: ['encargar', 'decir', 'leer', 'escribir', 'publicar', 'recomendar', 'comprar', 'vender'],
        2: ['tener', 'necesitar', 'desear', 'querer', 'ganar', 'gastar', 'poseer', 'requerir'],
        3: ['estudiar', 'trabajar', 'aprender', 'enseñar', 'practicar', 'mejorar'],
        4: ['presupuestar', 'estimar', 'calcular', 'prever', 'anticipar', 'proyectar']
    }
    
    # Generar 100 ejercicios
    contador = 1
    for i in range(1, 101):
        if i <= 30:
            cat_id = 1
            respuesta = random.choice(['de los que', 'de las que', 'de lo que'])
            opciones = [respuesta, 'que']
        elif i <= 60:
            cat_id = 2
            if random.random() > 0.3:
                respuesta = 'ambas'
                opciones = ['de los que', 'que', 'ambas']
            else:
                respuesta = random.choice(['de los que', 'de las que'])
                opciones = [respuesta, 'que']
        elif i <= 85:
            cat_id = 3
            if random.random() > 0.5:
                respuesta = 'ambas'
                opciones = ['de los que', 'que', 'ambas']
            else:
                respuesta = random.choice(['de los que', 'de las que'])
                opciones = [respuesta, 'que']
        else:
            cat_id = 4
            respuesta = random.choice(['ambas', 'de los que'])
            opciones = ['de los que', 'que', 'ambas'] if respuesta == 'ambas' else ['de los que', 'que']
        
        verbo = random.choice(verbos[cat_id])
        sujetos = ['Juan', 'María', 'Pedro', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Sofia']
        objetos = ['libros', 'revistas', 'cartas', 'documentos', 'ejercicios', 'tareas', 'informes']
        
        sujeto = random.choice(sujetos)
        objeto = random.choice(objetos)
        
        ejercicios_default["categorias"][cat_id-1]["ejercicios"].append({
            "id": contador,
            "oracion_incompleta": f"{sujeto} {random.choice(['compró', 'leyó', 'escribió', 'tuvo', 'necesitó'])} más {objeto} _______ {verbo}.",
            "opciones": opciones,
            "respuesta_correcta": respuesta,
            "verbo": verbo,
            "nivel": cat_id,
            "explicacion": f"Ejercicio {contador}: Analiza el verbo '{verbo}' para determinar la construcción correcta."
        })
        contador += 1
    
    return ejercicios_default

# Cargar datos
ejercicios_data = cargar_json(EJERCICIOS_FILE, inicializar_ejercicios())

# ============================================
# RUTAS PÚBLICAS
# ============================================

@app.route('/')
def index():
    """Página de inicio"""
    user = get_current_user()
    return render_template('index.html', user=user)

@app.route('/teoria')
def teoria():
    """Página de teoría"""
    user = get_current_user()
    return render_template('teoria.html', user=user)

@app.route('/ejemplos')
def ejemplos():
    """Página de ejemplos"""
    user = get_current_user()
    return render_template('ejemplos.html', user=user)

# ============================================
# RUTAS DE AUTENTICACIÓN
# ============================================

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Página de login y registro"""
    if request.method == 'POST':
        username = request.form.get('username', '').strip()
        password = request.form.get('password', '')
        accion = request.form.get('accion')
        
        if not username or not password:
            flash('Usuario y contraseña son requeridos', 'danger')
            return render_template('login.html')
        
        usuarios = cargar_json(USUARIOS_FILE, {"usuarios": []})
        
        if accion == 'registro':
            # Verificar si usuario existe
            for usuario in usuarios['usuarios']:
                if usuario['username'].lower() == username.lower():
                    flash('El nombre de usuario ya existe', 'danger')
                    return render_template('login.html')
            
            # Crear nuevo usuario
            nuevo_usuario = {
                'id': len(usuarios['usuarios']) + 1,
                'username': username,
                'password': hash_password(password),
                'fecha_registro': datetime.now().isoformat(),
                'ultimo_acceso': datetime.now().isoformat(),
                'estadisticas': {
                    'puntuacion_total': 0,
                    'ejercicios_completados': 0,
                    'ejercicios_correctos': 0,
                    'racha_actual': 0,
                    'mejor_racha': 0,
                    'estrellas': 0,
                    'medallas': [],
                    'nivel': 1,
                    'experiencia': 0,
                    'proximo_nivel': 100,
                    'categorias_completadas': [],
                    'historial': []
                }
            }
            
            usuarios['usuarios'].append(nuevo_usuario)
            guardar_json(USUARIOS_FILE, usuarios)
            
            session.permanent = True
            session['user_id'] = nuevo_usuario['id']
            session['username'] = nuevo_usuario['username']
            
            flash(f'¡Bienvenido {username}! Tu cuenta ha sido creada exitosamente.', 'success')
            return redirect(url_for('dashboard'))
        
        else:  # login
            for usuario in usuarios['usuarios']:
                if usuario['username'].lower() == username.lower() and usuario['password'] == hash_password(password):
                    # Actualizar último acceso
                    usuario['ultimo_acceso'] = datetime.now().isoformat()
                    guardar_json(USUARIOS_FILE, usuarios)
                    
                    session.permanent = True
                    session['user_id'] = usuario['id']
                    session['username'] = usuario['username']
                    
                    flash(f'¡Bienvenido de nuevo, {username}!', 'success')
                    return redirect(url_for('dashboard'))
            
            flash('Usuario o contraseña incorrectos', 'danger')
            return render_template('login.html')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    """Cerrar sesión"""
    session.clear()
    flash('Has cerrado sesión correctamente', 'info')
    return redirect(url_for('index'))

# ============================================
# RUTAS PROTEGIDAS
# ============================================

@app.route('/dashboard')
@login_required
def dashboard():
    """Dashboard del usuario"""
    user = get_current_user()
    return render_template('dashboard.html', usuario=user)

@app.route('/pruebas')
@login_required
def pruebas():
    """Página de pruebas interactivas"""
    user = get_current_user()
    return render_template('pruebas.html', user=user)

@app.route('/practica')
@login_required
def practica():
    """Página de práctica gamificada"""
    user = get_current_user()
    categorias = ejercicios_data['categorias']
    return render_template('practica.html', user=user, categorias=categorias)

@app.route('/ranking')
@login_required
def ranking():
    """Página de ranking global"""
    user = get_current_user()
    usuarios = cargar_json(USUARIOS_FILE, {"usuarios": []})
    
    # Calcular ranking
    ranking_list = []
    for u in usuarios['usuarios']:
        ranking_list.append({
            'username': u['username'],
            'puntuacion': u['estadisticas']['puntuacion_total'],
            'estrellas': u['estadisticas']['estrellas'],
            'medallas': len(u['estadisticas']['medallas']),
            'nivel': u['estadisticas']['nivel'],
            'racha': u['estadisticas']['mejor_racha']
        })
    
    ranking_list.sort(key=lambda x: x['puntuacion'], reverse=True)
    
    return render_template('ranking.html', user=user, ranking=ranking_list[:20])

# ============================================
# API ENDPOINTS
# ============================================

@app.route('/api/categoria/<int:categoria_id>')
@login_required
def get_categoria(categoria_id):
    """Obtiene una categoría por ID"""
    categoria = next((c for c in ejercicios_data['categorias'] if c['id'] == categoria_id), None)
    if categoria:
        return jsonify(categoria)
    return jsonify({'error': 'Categoría no encontrada'}), 404

@app.route('/api/ejercicio/random')
@login_required
def get_random_ejercicio():
    """Obtiene un ejercicio aleatorio"""
    todas_categorias = ejercicios_data['categorias']
    categoria = random.choice(todas_categorias)
    ejercicio = random.choice(categoria['ejercicios'])
    
    return jsonify({
        'categoria': categoria['nombre'],
        'ejercicio': ejercicio
    })

@app.route('/api/verificar_ejercicio', methods=['POST'])
@login_required
def verificar_ejercicio():
    """Verifica la respuesta de un ejercicio"""
    data = request.json
    ejercicio_id = data.get('ejercicio_id')
    respuesta = data.get('respuesta')
    categoria_id = data.get('categoria_id')
    
    # Buscar ejercicio
    categoria = next((c for c in ejercicios_data['categorias'] if c['id'] == categoria_id), None)
    if not categoria:
        return jsonify({'error': 'Categoría no encontrada'}), 404
    
    ejercicio = next((e for e in categoria['ejercicios'] if e['id'] == ejercicio_id), None)
    if not ejercicio:
        return jsonify({'error': 'Ejercicio no encontrado'}), 404
    
    # Verificar respuesta
    correcta = ejercicio['respuesta_correcta']
    es_correcta = (respuesta == correcta) or (correcta == 'ambas' and respuesta in ['de los que', 'que'])
    
    # Actualizar estadísticas del usuario
    usuarios = cargar_json(USUARIOS_FILE, {"usuarios": []})
    usuario = next((u for u in usuarios['usuarios'] if u['id'] == session['user_id']), None)
    
    if usuario:
        estadisticas = usuario['estadisticas']
        
        if es_correcta:
            # Calcular puntos
            puntos_base = 10 * categoria['nivel']
            bonus_racha = min(estadisticas['racha_actual'] * 2, 20)  # Máximo 20 puntos bonus
            puntos_totales = puntos_base + bonus_racha
            
            estadisticas['puntuacion_total'] += puntos_totales
            estadisticas['ejercicios_completados'] += 1
            estadisticas['ejercicios_correctos'] += 1
            estadisticas['racha_actual'] += 1
            estadisticas['experiencia'] += puntos_totales
            
            # Actualizar mejor racha
            if estadisticas['racha_actual'] > estadisticas['mejor_racha']:
                estadisticas['mejor_racha'] = estadisticas['racha_actual']
            
            # Calcular nivel
            while estadisticas['experiencia'] >= estadisticas['proximo_nivel']:
                estadisticas['nivel'] += 1
                estadisticas['experiencia'] -= estadisticas['proximo_nivel']
                estadisticas['proximo_nivel'] = int(estadisticas['proximo_nivel'] * 1.5)
            
            # Calcular estrellas (cada 100 puntos)
            nuevas_estrellas = estadisticas['puntuacion_total'] // 100
            if nuevas_estrellas > estadisticas['estrellas']:
                estadisticas['estrellas'] = nuevas_estrellas
            
            # Verificar medallas
            medallas_nuevas = verificar_medallas(usuario)
            
            # Registrar en historial
            if 'historial' not in estadisticas:
                estadisticas['historial'] = []
            
            estadisticas['historial'].append({
                'fecha': datetime.now().isoformat(),
                'ejercicio_id': ejercicio_id,
                'categoria': categoria['nombre'],
                'correcto': True,
                'puntos': puntos_totales,
                'respuesta_usuario': respuesta,
                'respuesta_correcta': correcta
            })
            
            # Mantener solo últimos 50 registros
            if len(estadisticas['historial']) > 50:
                estadisticas['historial'] = estadisticas['historial'][-50:]
            
            guardar_json(USUARIOS_FILE, usuarios)
            
            return jsonify({
                'correcta': True,
                'explicacion': ejercicio['explicacion'],
                'respuesta_correcta': correcta,
                'puntos_ganados': puntos_totales,
                'bonus_racha': bonus_racha,
                'estadisticas': estadisticas,
                'medallas_nuevas': medallas_nuevas
            })
        else:
            # Respuesta incorrecta
            estadisticas['racha_actual'] = 0
            
            if 'historial' not in estadisticas:
                estadisticas['historial'] = []
            
            estadisticas['historial'].append({
                'fecha': datetime.now().isoformat(),
                'ejercicio_id': ejercicio_id,
                'categoria': categoria['nombre'],
                'correcto': False,
                'puntos': 0,
                'respuesta_usuario': respuesta,
                'respuesta_correcta': correcta
            })
            
            guardar_json(USUARIOS_FILE, usuarios)
            
            return jsonify({
                'correcta': False,
                'explicacion': ejercicio['explicacion'],
                'respuesta_correcta': correcta,
                'puntos_ganados': 0,
                'estadisticas': estadisticas
            })
    
    return jsonify({'error': 'Usuario no encontrado'}), 404

def verificar_medallas(usuario):
    """Verifica si el usuario ha obtenido nuevas medallas"""
    medallas_nuevas = []
    estadisticas = usuario['estadisticas']
    medallas_actuales = estadisticas.get('medallas', [])
    
    # Diccionario de medallas disponibles
    medallas_disponibles = {
        # Por puntuación
        'puntuacion_1000': {'nombre': 'Aprendiz', 'descripcion': 'Alcanzaste 1000 puntos', 'icono': '🥉', 'condicion': estadisticas['puntuacion_total'] >= 1000},
        'puntuacion_5000': {'nombre': 'Profesional', 'descripcion': 'Alcanzaste 5000 puntos', 'icono': '🥈', 'condicion': estadisticas['puntuacion_total'] >= 5000},
        'puntuacion_10000': {'nombre': 'Experto', 'descripcion': 'Alcanzaste 10000 puntos', 'icono': '🥇', 'condicion': estadisticas['puntuacion_total'] >= 10000},
        
        # Por racha
        'racha_10': {'nombre': 'Racha de 10', 'descripcion': '10 respuestas correctas consecutivas', 'icono': '🔥', 'condicion': estadisticas['mejor_racha'] >= 10},
        'racha_25': {'nombre': 'Racha de 25', 'descripcion': '25 respuestas correctas consecutivas', 'icono': '⚡', 'condicion': estadisticas['mejor_racha'] >= 25},
        'racha_50': {'nombre': 'Racha de 50', 'descripcion': '50 respuestas correctas consecutivas', 'icono': '👑', 'condicion': estadisticas['mejor_racha'] >= 50},
        
        # Por ejercicios
        'ejercicios_50': {'nombre': 'Práctica Constante', 'descripcion': '50 ejercicios completados', 'icono': '📚', 'condicion': estadisticas['ejercicios_completados'] >= 50},
        'ejercicios_100': {'nombre': 'Dedicación', 'descripcion': '100 ejercicios completados', 'icono': '🎯', 'condicion': estadisticas['ejercicios_completados'] >= 100},
        'ejercicios_250': {'nombre': 'Maestro', 'descripcion': '250 ejercicios completados', 'icono': '🎓', 'condicion': estadisticas['ejercicios_completados'] >= 250},
        
        # Por precisión
        'precision_80': {'nombre': 'Precisión', 'descripcion': '80% de respuestas correctas', 'icono': '🎯', 'condicion': estadisticas['ejercicios_completados'] > 0 and (estadisticas['ejercicios_correctos'] / estadisticas['ejercicios_completados']) >= 0.8},
        'precision_90': {'nombre': 'Excelencia', 'descripcion': '90% de respuestas correctas', 'icono': '💎', 'condicion': estadisticas['ejercicios_completados'] > 0 and (estadisticas['ejercicios_correctos'] / estadisticas['ejercicios_completados']) >= 0.9},
        
        # Por nivel
        'nivel_5': {'nombre': 'Nivel 5', 'descripcion': 'Alcanzaste el nivel 5', 'icono': '⭐', 'condicion': estadisticas['nivel'] >= 5},
        'nivel_10': {'nombre': 'Nivel 10', 'descripcion': 'Alcanzaste el nivel 10', 'icono': '🌟', 'condicion': estadisticas['nivel'] >= 10},
    }
    
    for medalla_id, info in medallas_disponibles.items():
        if info['condicion'] and medalla_id not in medallas_actuales:
            medallas_nuevas.append({
                'id': medalla_id,
                'nombre': info['nombre'],
                'descripcion': info['descripcion'],
                'icono': info['icono']
            })
            medallas_actuales.append(medalla_id)
    
    estadisticas['medallas'] = medallas_actuales
    return medallas_nuevas

@app.route('/api/ranking/top')
def get_top_ranking():
    """Obtiene el top 10 del ranking"""
    usuarios = cargar_json(USUARIOS_FILE, {"usuarios": []})
    ranking = []
    
    for usuario in usuarios['usuarios']:
        ranking.append({
            'username': usuario['username'],
            'puntuacion': usuario['estadisticas']['puntuacion_total'],
            'estrellas': usuario['estadisticas']['estrellas'],
            'medallas': len(usuario['estadisticas']['medallas']),
            'nivel': usuario['estadisticas']['nivel']
        })
    
    ranking.sort(key=lambda x: x['puntuacion'], reverse=True)
    return jsonify(ranking[:10])

@app.route('/api/estadisticas/usuario')
@login_required
def get_usuario_estadisticas():
    """Obtiene estadísticas del usuario actual"""
    usuario = get_current_user()
    if usuario:
        return jsonify(usuario['estadisticas'])
    return jsonify({'error': 'Usuario no encontrado'}), 404

# ============================================
# INICIAR APLICACIÓN
# ============================================

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
