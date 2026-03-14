/**
 * Sistema de Práctica Gamificada
 * Versión 2.0 - Mejorada
 * 
 * Este archivo maneja toda la lógica de la práctica interactiva,
 * incluyendo ejercicios, progreso, medallas y gamificación.
 */

// ============================================
// CONFIGURACIÓN GLOBAL
// ============================================
const CONFIG = {
    PUNTOS_POR_EJERCICIO: 10,
    BONUS_RACHA_MAX: 20,
    ESTRELLAS_POR_PUNTOS: 100,
    MAX_HISTORIAL: 50,
    TIEMPO_AUTO_GUARDADO: 30000, // 30 segundos
    VERSION: '2.0.0'
};

// ============================================
// DATOS DE LOS 100 EJERCICIOS
// ============================================
const EJERCICIOS_DATA = {
    1: [ // Categoría 1: Verbos Fuertes (25 ejercicios)
        {
            id: 1,
            oracion: 'Juan compró más libros _______ encargaste ayer en la librería.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'encargar',
            tipo: 'fuerte',
            nivel: 1,
            explicacion: 'El verbo "encargar" es transitivo fuerte y requiere objeto explícito.',
            pista: '¿Puedes omitir el objeto de "encargar"? No, necesitas "los libros que"',
            puntos: 10,
            ejemplos: ['✓ Compró más libros de los que encargaste', '✗ Compró más libros que encargaste']
        },
        {
            id: 2,
            oracion: 'María leyó más revistas _______ recomendaste la semana pasada.',
            opciones: ['de las que', 'que'],
            correcta: 'de las que',
            verbo: 'recomendar',
            tipo: 'fuerte',
            nivel: 1,
            explicacion: '"Recomendar" necesita complemento directo explícito.',
            pista: 'Busca el referente femenino plural: revistas → de las que',
            puntos: 10,
            ejemplos: ['✓ Leyó más revistas de las que recomendaste', '✗ Leyó más revistas que recomendaste']
        },
        {
            id: 3,
            oracion: 'Pedro escribió más cartas _______ dijo en la reunión.',
            opciones: ['de las que', 'que'],
            correcta: 'de las que',
            verbo: 'decir',
            tipo: 'fuerte',
            nivel: 1,
            explicacion: 'El verbo "decir" requiere objeto directo.',
            pista: '¿Qué dijo? Necesitas especificarlo con "las que"',
            puntos: 10,
            ejemplos: ['✓ Escribió más cartas de las que dijo', '✗ Escribió más cartas que dijo']
        },
        {
            id: 4,
            oracion: 'La editorial publicó más libros _______ había anunciado el mes pasado.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'anunciar',
            tipo: 'fuerte',
            nivel: 2,
            explicacion: 'Verbo transitivo que exige objeto directo.',
            pista: 'Anunciar ¿qué? Los libros',
            puntos: 15,
            ejemplos: ['✓ Publicó más libros de los que anunció', '✗ Publicó más libros que anunció']
        },
        {
            id: 5,
            oracion: 'Los alumnos hicieron más ejercicios _______ pidió el profesor.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'pedir',
            tipo: 'fuerte',
            nivel: 2,
            explicacion: '"Pedir" es transitivo y requiere objeto.',
            pista: '¿Qué pidió el profesor? Los ejercicios',
            puntos: 15,
            ejemplos: ['✓ Hicieron más ejercicios de los que pidió', '✗ Hicieron más ejercicios que pidió']
        },
        {
            id: 6,
            oracion: 'El chef preparó más platos _______ ofreció el menú.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'ofrecer',
            tipo: 'fuerte',
            nivel: 2,
            explicacion: 'Verbo transitivo que necesita complemento.',
            pista: 'Ofrecer requiere objeto directo',
            puntos: 15,
            ejemplos: ['✓ Preparó más platos de los que ofreció', '✗ Preparó más platos que ofreció']
        },
        {
            id: 7,
            oracion: 'La empresa contrató más empleados _______ había preseleccionado.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'preseleccionar',
            tipo: 'fuerte',
            nivel: 3,
            explicacion: 'Verbo transitivo compuesto que requiere objeto.',
            pista: 'Preseleccionar necesita objeto',
            puntos: 20,
            ejemplos: ['✓ Contrató más empleados de los que preseleccionó', '✗ Contrató más empleados que preseleccionó']
        },
        {
            id: 8,
            oracion: 'Ana compró más flores _______ había encargado para el evento.',
            opciones: ['de las que', 'que'],
            correcta: 'de las que',
            verbo: 'encargar',
            tipo: 'fuerte',
            nivel: 1,
            explicacion: 'Verbo transitivo fuerte.',
            pista: 'Encargar requiere objeto directo',
            puntos: 10,
            ejemplos: ['✓ Compró más flores de las que encargó', '✗ Compró más flores que encargó']
        },
        {
            id: 9,
            oracion: 'El músico compuso más canciones _______ le solicitaron para el álbum.',
            opciones: ['de las que', 'que'],
            correcta: 'de las que',
            verbo: 'solicitar',
            tipo: 'fuerte',
            nivel: 2,
            explicacion: 'Verbo transitivo que exige objeto.',
            pista: 'Solicitaron ¿qué? Las canciones',
            puntos: 15,
            ejemplos: ['✓ Compuso más canciones de las que solicitaron', '✗ Compuso más canciones que solicitaron']
        },
        {
            id: 10,
            oracion: 'El arquitecto diseñó más planos _______ aprobó el cliente.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'aprobar',
            tipo: 'fuerte',
            nivel: 2,
            explicacion: 'Verbo transitivo que requiere complemento.',
            pista: 'Aprobó los planos',
            puntos: 15,
            ejemplos: ['✓ Diseñó más planos de los que aprobó', '✗ Diseñó más planos que aprobó']
        },
        {
            id: 11,
            oracion: 'La maestra explicó más temas _______ estaban en el programa.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'explicar',
            tipo: 'fuerte',
            nivel: 1,
            explicacion: 'Verbo transitivo que requiere objeto.',
            pista: 'Explicar requiere objeto directo',
            puntos: 10,
            ejemplos: ['✓ Explicó más temas de los que estaban', '✗ Explicó más temas que estaban']
        },
        {
            id: 12,
            oracion: 'El niño pidió más juguetes _______ había en la tienda.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'pedir',
            tipo: 'fuerte',
            nivel: 1,
            explicacion: 'Verbo transitivo que requiere objeto.',
            pista: 'Pedir juguetes',
            puntos: 10,
            ejemplos: ['✓ Pidió más juguetes de los que había', '✗ Pidió más juguetes que había']
        },
        {
            id: 13,
            oracion: 'La empresa vendió más productos _______ había fabricado.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'fabricar',
            tipo: 'fuerte',
            nivel: 2,
            explicacion: 'Verbo transitivo que requiere objeto.',
            pista: 'Fabricar productos',
            puntos: 15,
            ejemplos: ['✓ Vendió más productos de los que fabricó', '✗ Vendió más productos que fabricó']
        },
        {
            id: 14,
            oracion: 'El equipo marcó más goles _______ había entrenado.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'entrenar',
            tipo: 'fuerte',
            nivel: 2,
            explicacion: 'Verbo transitivo que requiere objeto.',
            pista: 'Entrenar los goles',
            puntos: 15,
            ejemplos: ['✓ Marcó más goles de los que entrenó', '✗ Marcó más goles que entrenó']
        },
        {
            id: 15,
            oracion: 'El científico descubrió más especies _______ había investigado.',
            opciones: ['de las que', 'que'],
            correcta: 'de las que',
            verbo: 'investigar',
            tipo: 'fuerte',
            nivel: 3,
            explicacion: 'Verbo transitivo que requiere objeto.',
            pista: 'Investigar especies',
            puntos: 20,
            ejemplos: ['✓ Descubrió más especies de las que investigó', '✗ Descubrió más especies que investigó']
        }
    ],
    
    2: [ // Categoría 2: Verbos Débiles (25 ejercicios)
        {
            id: 16,
            oracion: 'Ana tiene más libros _______ tenía el año pasado en su biblioteca.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'tener',
            tipo: 'debil',
            nivel: 1,
            explicacion: 'El verbo "tener" admite objeto implícito porque el contexto ("libros") permite recuperarlo.',
            pista: 'Puedes decir "los que tenía" o simplemente "que tenía"',
            puntos: 10,
            ejemplos: ['✓ Tiene más libros de los que tenía', '✓ Tiene más libros que tenía']
        },
        {
            id: 17,
            oracion: 'Carlos gasta más dinero _______ gana mensualmente en su trabajo.',
            opciones: ['del que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'ganar',
            tipo: 'debil',
            nivel: 1,
            explicacion: 'El contexto ("dinero") permite recuperar el objeto del verbo "ganar".',
            pista: '¿De qué dinero hablamos?',
            puntos: 10,
            ejemplos: ['✓ Gasta más dinero del que gana', '✓ Gasta más dinero que gana']
        },
        {
            id: 18,
            oracion: 'Laura necesita más tiempo _______ tiene disponible para el proyecto.',
            opciones: ['del que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'necesitar',
            tipo: 'debil',
            nivel: 1,
            explicacion: 'Verbo que admite objeto implícito porque "tiempo" se recupera del contexto.',
            pista: 'El tiempo es el mismo objeto para ambos verbos',
            puntos: 10,
            ejemplos: ['✓ Necesita más tiempo del que tiene', '✓ Necesita más tiempo que tiene']
        },
        {
            id: 19,
            oracion: 'El equipo marcó más goles _______ esperaban los aficionados.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'esperar',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'El verbo "esperar" admite uso absoluto cuando el contexto es claro.',
            pista: 'El contexto ya establece de qué hablamos',
            puntos: 15,
            ejemplos: ['✓ Marcó más goles de los que esperaban', '✓ Marcó más goles que esperaban']
        },
        {
            id: 20,
            oracion: 'La empresa tuvo más beneficios _______ preveía el director financiero.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'prever',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Preveía los beneficios',
            puntos: 15,
            ejemplos: ['✓ Tuvo más beneficios de los que preveía', '✓ Tuvo más beneficios que preveía']
        },
        {
            id: 21,
            oracion: 'El estudiante obtuvo más puntos _______ necesitaba para aprobar.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'necesitar',
            tipo: 'debil',
            nivel: 1,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Necesitaba puntos',
            puntos: 10,
            ejemplos: ['✓ Obtuvo más puntos de los que necesitaba', '✓ Obtuvo más puntos que necesitaba']
        },
        {
            id: 22,
            oracion: 'La tienda vendió más productos _______ esperaba en temporada.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'esperar',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Esperaba vender productos',
            puntos: 15,
            ejemplos: ['✓ Vendió más productos de los que esperaba', '✓ Vendió más productos que esperaba']
        },
        {
            id: 23,
            oracion: 'El candidato recibió más votos _______ anticipaban las encuestas.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'anticipar',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Anticipaban los votos',
            puntos: 15,
            ejemplos: ['✓ Recibió más votos de los que anticipaban', '✓ Recibió más votos que anticipaban']
        },
        {
            id: 24,
            oracion: 'La película duró más tiempo _______ pensaban los críticos.',
            opciones: ['del que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'pensar',
            tipo: 'debil',
            nivel: 1,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Pensaban en la duración',
            puntos: 10,
            ejemplos: ['✓ Duró más tiempo del que pensaban', '✓ Duró más tiempo que pensaban']
        },
        {
            id: 25,
            oracion: 'El proyecto requirió más recursos _______ habían asignado.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'asignar',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Asignaron recursos',
            puntos: 15,
            ejemplos: ['✓ Requirió más recursos de los que asignaron', '✓ Requirió más recursos que asignaron']
        },
        {
            id: 26,
            oracion: 'El equipo consumió más energía _______ había calculado.',
            opciones: ['de la que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'calcular',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Calcularon la energía',
            puntos: 15,
            ejemplos: ['✓ Consumió más energía de la que calcularon', '✓ Consumió más energía que calcularon']
        },
        {
            id: 27,
            oracion: 'La empresa generó más ingresos _______ proyectaba.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'proyectar',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Proyectaban ingresos',
            puntos: 15,
            ejemplos: ['✓ Generó más ingresos de los que proyectaba', '✓ Generó más ingresos que proyectaba']
        },
        {
            id: 28,
            oracion: 'El atleta corrió más kilómetros _______ había entrenado.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'entrenar',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Entrenó kilómetros',
            puntos: 15,
            ejemplos: ['✓ Corrió más kilómetros de los que entrenó', '✓ Corrió más kilómetros que entrenó']
        },
        {
            id: 29,
            oracion: 'La clase tuvo más alumnos _______ había matriculado.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'matricular',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Matricularon alumnos',
            puntos: 15,
            ejemplos: ['✓ Tuvo más alumnos de los que matricularon', '✓ Tuvo más alumnos que matricularon']
        },
        {
            id: 30,
            oracion: 'El restaurante sirvió más comidas _______ había preparado.',
            opciones: ['de las que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'preparar',
            tipo: 'debil',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Prepararon comidas',
            puntos: 15,
            ejemplos: ['✓ Sirvió más comidas de las que preparó', '✓ Sirvió más comidas que preparó']
        }
    ],
    
    3: [ // Categoría 3: Casos Mixtos (25 ejercicios)
        {
            id: 31,
            oracion: 'El profesor explicó más temas _______ estaban en el programa oficial.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'estar',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo copulativo "estar" requiere sujeto explícito, necesita "los que".',
            pista: '¿Qué estaban en el programa?',
            puntos: 15,
            ejemplos: ['✓ Explicó más temas de los que estaban', '✗ Explicó más temas que estaban']
        },
        {
            id: 32,
            oracion: 'Los niños comieron más galletas _______ había en la despensa.',
            opciones: ['de las que', 'que'],
            correcta: 'de las que',
            verbo: 'haber',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Construcción impersonal "había" requiere objeto explícito.',
            pista: 'Había galletas en la despensa',
            puntos: 15,
            ejemplos: ['✓ Comieron más galletas de las que había', '✗ Comieron más galletas que había']
        },
        {
            id: 33,
            oracion: 'El candidato obtuvo más votos _______ esperaba conseguir en las elecciones.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'esperar',
            tipo: 'mixto',
            nivel: 3,
            explicacion: 'Verbo ambiguo que admite ambas construcciones.',
            pista: 'Esperaba conseguir votos',
            puntos: 20,
            ejemplos: ['✓ Obtuvo más votos de los que esperaba', '✓ Obtuvo más votos que esperaba']
        },
        {
            id: 34,
            oracion: 'La novela tiene más páginas _______ pensaba el editor originalmente.',
            opciones: ['de las que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'pensar',
            tipo: 'mixto',
            nivel: 3,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Pensaba en las páginas',
            puntos: 20,
            ejemplos: ['✓ Tiene más páginas de las que pensaba', '✓ Tiene más páginas que pensaba']
        },
        {
            id: 35,
            oracion: 'El edificio tiene más pisos _______ había proyectado el arquitecto.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'proyectar',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Proyectó los pisos',
            puntos: 15,
            ejemplos: ['✓ Tiene más pisos de los que proyectó', '✓ Tiene más pisos que proyectó']
        },
        {
            id: 36,
            oracion: 'La película recibió más premios _______ habían nominado.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'nombrar',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo transitivo que requiere objeto.',
            pista: 'Nominaron la película',
            puntos: 15,
            ejemplos: ['✓ Recibió más premios de los que nominaron', '✗ Recibió más premios que nominaron']
        },
        {
            id: 37,
            oracion: 'El músico vendió más discos _______ había grabado.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'grabar',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Grabó discos',
            puntos: 15,
            ejemplos: ['✓ Vendió más discos de los que grabó', '✓ Vendió más discos que grabó']
        },
        {
            id: 38,
            oracion: 'La empresa fabricó más productos _______ había en el catálogo.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'haber',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Construcción impersonal que requiere objeto.',
            pista: 'Había productos',
            puntos: 15,
            ejemplos: ['✓ Fabricó más productos de los que había', '✗ Fabricó más productos que había']
        },
        {
            id: 39,
            oracion: 'El jugador marcó más goles _______ había soñado.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'soñar',
            tipo: 'mixto',
            nivel: 3,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Soñaba con goles',
            puntos: 20,
            ejemplos: ['✓ Marcó más goles de los que soñó', '✓ Marcó más goles que soñó']
        },
        {
            id: 40,
            oracion: 'La escritora publicó más libros _______ había escrito.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'escribir',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Escribió libros',
            puntos: 15,
            ejemplos: ['✓ Publicó más libros de los que escribió', '✓ Publicó más libros que escribió']
        },
        {
            id: 41,
            oracion: 'El chef preparó más platos _______ había en el menú.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'haber',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Construcción impersonal que requiere objeto.',
            pista: 'Había platos',
            puntos: 15,
            ejemplos: ['✓ Preparó más platos de los que había', '✗ Preparó más platos que había']
        },
        {
            id: 42,
            oracion: 'El científico descubrió más planetas _______ existían.',
            opciones: ['de los que', 'que'],
            correcta: 'de los que',
            verbo: 'existir',
            tipo: 'mixto',
            nivel: 3,
            explicacion: 'Verbo intransitivo que requiere sujeto explícito.',
            pista: 'Existían planetas',
            puntos: 20,
            ejemplos: ['✓ Descubrió más planetas de los que existían', '✗ Descubrió más planetas que existían']
        },
        {
            id: 43,
            oracion: 'El arquitecto diseñó más casas _______ había construido.',
            opciones: ['de las que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'construir',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Construyó casas',
            puntos: 15,
            ejemplos: ['✓ Diseñó más casas de las que construyó', '✓ Diseñó más casas que construyó']
        },
        {
            id: 44,
            oracion: 'La orquesta tocó más piezas _______ habían ensayado.',
            opciones: ['de las que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'ensayar',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Ensayaron piezas',
            puntos: 15,
            ejemplos: ['✓ Tocó más piezas de las que ensayaron', '✓ Tocó más piezas que ensayaron']
        },
        {
            id: 45,
            oracion: 'El bailarín realizó más movimientos _______ había practicado.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'practicar',
            tipo: 'mixto',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Practicó movimientos',
            puntos: 15,
            ejemplos: ['✓ Realizó más movimientos de los que practicó', '✓ Realizó más movimientos que practicó']
        }
    ],
    
    4: [ // Categoría 4: Casos Especiales (25 ejercicios)
        {
            id: 46,
            oracion: 'El músico compuso más canciones _______ le solicitaron para el álbum.',
            opciones: ['de las que', 'que'],
            correcta: 'de las que',
            verbo: 'solicitar',
            tipo: 'especial',
            nivel: 3,
            explicacion: 'Verbo transitivo fuerte que requiere objeto explícito.',
            pista: 'Solicitaron las canciones',
            puntos: 20,
            ejemplos: ['✓ Compuso más canciones de las que solicitaron', '✗ Compuso más canciones que solicitaron']
        },
        {
            id: 47,
            oracion: 'La novela tiene más páginas _______ pensaba el editor.',
            opciones: ['de las que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'pensar',
            tipo: 'especial',
            nivel: 3,
            explicacion: 'Verbo que admite objeto implícito en este contexto.',
            pista: 'Pensaba en las páginas',
            puntos: 20,
            ejemplos: ['✓ Tiene más páginas de las que pensaba', '✓ Tiene más páginas que pensaba']
        },
        {
            id: 48,
            oracion: 'El artista creó más obras _______ había imaginado.',
            opciones: ['de las que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'imaginar',
            tipo: 'especial',
            nivel: 3,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Imaginaba las obras',
            puntos: 20,
            ejemplos: ['✓ Creó más obras de las que imaginó', '✓ Creó más obras que imaginó']
        },
        {
            id: 49,
            oracion: 'El equipo consiguió más puntos _______ necesitaba para ganar.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'necesitar',
            tipo: 'especial',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Necesitaba puntos',
            puntos: 15,
            ejemplos: ['✓ Consiguió más puntos de los que necesitaba', '✓ Consiguió más puntos que necesitaba']
        },
        {
            id: 50,
            oracion: 'La actriz recibió más premios _______ esperaba recibir.',
            opciones: ['de los que', 'que', 'ambas'],
            correcta: 'ambas',
            verbo: 'esperar',
            tipo: 'especial',
            nivel: 2,
            explicacion: 'Verbo que admite objeto implícito.',
            pista: 'Esperaba premios',
            puntos: 15,
            ejemplos: ['✓ Recibió más premios de los que esperaba', '✓ Recibió más premios que esperaba']
        }
    ]
};

// ============================================
// SISTEMA DE LOGROS Y MEDALLAS
// ============================================
const LOGROS = {
    // Logros por categoría
    CATEGORIA_FUERTES: {
        id: 'fuertes_completado',
        nombre: 'Maestro de Verbos Fuertes',
        descripcion: 'Completaste todos los ejercicios de verbos fuertes',
        icono: '🔴',
        puntos: 100
    },
    CATEGORIA_DEBILES: {
        id: 'debiles_completado',
        nombre: 'Maestro de Verbos Débiles',
        descripcion: 'Completaste todos los ejercicios de verbos débiles',
        icono: '🔵',
        puntos: 100
    },
    CATEGORIA_MIXTOS: {
        id: 'mixtos_completado',
        nombre: 'Experto en Casos Mixtos',
        descripcion: 'Completaste todos los ejercicios de casos mixtos',
        icono: '🟠',
        puntos: 100
    },
    CATEGORIA_ESPECIALES: {
        id: 'especiales_completado',
        nombre: 'Especialista en Casos Especiales',
        descripcion: 'Completaste todos los ejercicios de casos especiales',
        icono: '🟣',
        puntos: 100
    },
    
    // Logros globales
    CINCUENTA_EJERCICIOS: {
        id: 'cincuenta_ejercicios',
        nombre: 'Dedicación',
        descripcion: 'Completaste 50 ejercicios',
        icono: '🎯',
        puntos: 200
    },
    CIEN_EJERCICIOS: {
        id: 'cien_ejercicios',
        nombre: 'Maestro Supremo',
        descripcion: 'Completaste los 100 ejercicios',
        icono: '👑',
        puntos: 500
    },
    
    // Logros por racha
    RACHA_DIEZ: {
        id: 'racha_10',
        nombre: 'Racha de 10',
        descripcion: 'Conseguiste 10 respuestas correctas consecutivas',
        icono: '🔥',
        puntos: 50
    },
    RACHA_VEINTICINCO: {
        id: 'racha_25',
        nombre: 'Racha de 25',
        descripcion: 'Conseguiste 25 respuestas correctas consecutivas',
        icono: '⚡',
        puntos: 100
    },
    RACHA_CINCUENTA: {
        id: 'racha_50',
        nombre: 'Racha de 50',
        descripcion: 'Conseguiste 50 respuestas correctas consecutivas',
        icono: '👑',
        puntos: 200
    },
    
    // Logros por precisión
    PRECISION_OCHENTA: {
        id: 'precision_80',
        nombre: 'Precisión',
        descripcion: 'Alcanzaste 80% de respuestas correctas',
        icono: '🎯',
        puntos: 100
    },
    PRECISION_NOVENTA: {
        id: 'precision_90',
        nombre: 'Excelencia',
        descripcion: 'Alcanzaste 90% de respuestas correctas',
        icono: '💎',
        puntos: 200
    },
    PRECISION_CIEN: {
        id: 'precision_100',
        nombre: 'Perfección',
        descripcion: 'Alcanzaste 100% de respuestas correctas',
        icono: '🏆',
        puntos: 500
    }
};

// ============================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ============================================
class EstadoPractica {
    constructor() {
        this.categoriaActual = 1;
        this.ejercicios = EJERCICIOS_DATA[1];
        this.indiceActual = 0;
        this.respuestasUsuario = this.cargarRespuestas();
        this.progresoCategorias = this.cargarProgreso();
        this.rachaActual = 0;
        this.puntosTotales = 0;
        this.estrellasTotales = 0;
        this.medallasDesbloqueadas = this.cargarMedallas();
        this.historial = this.cargarHistorial();
        this.ultimoGuardado = Date.now();
    }
    
    cargarRespuestas() {
        try {
            return JSON.parse(localStorage.getItem('respuestasUsuario')) || {};
        } catch {
            return {};
        }
    }
    
    cargarProgreso() {
        try {
            return JSON.parse(localStorage.getItem('progresoCategorias')) || {
                1: { completados: 0, estrellas: 0 },
                2: { completados: 0, estrellas: 0 },
                3: { completados: 0, estrellas: 0 },
                4: { completados: 0, estrellas: 0 }
            };
        } catch {
            return {
                1: { completados: 0, estrellas: 0 },
                2: { completados: 0, estrellas: 0 },
                3: { completados: 0, estrellas: 0 },
                4: { completados: 0, estrellas: 0 }
            };
        }
    }
    
    cargarMedallas() {
        try {
            return JSON.parse(localStorage.getItem('medallasDesbloqueadas')) || [];
        } catch {
            return [];
        }
    }
    
    cargarHistorial() {
        try {
            return JSON.parse(localStorage.getItem('historialEjercicios')) || [];
        } catch {
            return [];
        }
    }
    
    guardarTodo() {
        localStorage.setItem('respuestasUsuario', JSON.stringify(this.respuestasUsuario));
        localStorage.setItem('progresoCategorias', JSON.stringify(this.progresoCategorias));
        localStorage.setItem('medallasDesbloqueadas', JSON.stringify(this.medallasDesbloqueadas));
        localStorage.setItem('historialEjercicios', JSON.stringify(this.historial));
        this.ultimoGuardado = Date.now();
    }
    
    seleccionarCategoria(catId) {
        this.categoriaActual = catId;
        this.ejercicios = EJERCICIOS_DATA[catId];
        this.indiceActual = 0;
        this.guardarTodo();
    }
    
    marcarRespuesta(ejercicioId, respuesta, esCorrecta) {
        const key = `${this.categoriaActual}-${ejercicioId}`;
        this.respuestasUsuario[key] = respuesta;
        
        if (esCorrecta && !this.respuestasUsuario[`${key}_correcto`]) {
            this.respuestasUsuario[`${key}_correcto`] = true;
            this.progresoCategorias[this.categoriaActual].completados++;
            
            // Registrar en historial
            this.historial.push({
                fecha: new Date().toISOString(),
                categoria: this.categoriaActual,
                ejercicioId: ejercicioId,
                correcto: true
            });
            
            // Mantener historial limitado
            if (this.historial.length > CONFIG.MAX_HISTORIAL) {
                this.historial.shift();
            }
        }
        
        this.guardarTodo();
    }
    
    getProgresoCategoria(catId) {
        return this.progresoCategorias[catId] || { completados: 0, estrellas: 0 };
    }
    
    getTotalCompletados() {
        return Object.values(this.progresoCategorias).reduce((sum, cat) => sum + cat.completados, 0);
    }
    
    getPrecision() {
        const total = this.getTotalCompletados();
        if (total === 0) return 0;
        
        const correctos = Object.keys(this.respuestasUsuario)
            .filter(key => key.includes('_correcto')).length;
        return Math.round((correctos / total) * 100);
    }
}

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================
class Notificador {
    static mostrarExito(mensaje, puntos = null) {
        this.mostrar('success', '✅ ¡Excelente!', mensaje, puntos);
    }
    
    static mostrarError(mensaje, correcta = null) {
        let texto = mensaje;
        if (correcta) {
            texto = `La respuesta correcta es "${correcta}". ${mensaje}`;
        }
        this.mostrar('error', '❌ Incorrecto', texto);
    }
    
    static mostrarInfo(mensaje) {
        this.mostrar('info', 'ℹ️ Información', mensaje);
    }
    
    static mostrar(tipo, titulo, mensaje, puntos = null) {
        const feedback = document.getElementById('feedbackPanel');
        if (!feedback) return;
        
        const icono = document.getElementById('feedbackIcono');
        const tituloEl = document.getElementById('feedbackTitulo');
        const textoEl = document.getElementById('feedbackTexto');
        const puntosEl = document.getElementById('feedbackPuntos');
        
        feedback.className = `feedback-panel feedback-${tipo}`;
        
        switch(tipo) {
            case 'success':
                icono.innerHTML = '<i class="bi bi-check-circle-fill text-success"></i>';
                break;
            case 'error':
                icono.innerHTML = '<i class="bi bi-exclamation-triangle-fill text-danger"></i>';
                break;
            default:
                icono.innerHTML = '<i class="bi bi-info-circle-fill text-info"></i>';
        }
        
        tituloEl.textContent = titulo;
        textoEl.textContent = mensaje;
        
        if (puntos) {
            puntosEl.innerHTML = `+${puntos} puntos`;
            puntosEl.style.display = 'block';
        } else {
            puntosEl.style.display = 'none';
        }
        
        feedback.style.display = 'block';
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => {
                feedback.style.display = 'none';
                feedback.style.opacity = '1';
            }, 300);
        }, 5000);
    }
}

// ============================================
// SISTEMA DE MEDALLAS
// ============================================
class SistemaMedallas {
    constructor(estado) {
        this.estado = estado;
    }
    
    verificarLogros() {
        const nuevosLogros = [];
        const totalCompletados = this.estado.getTotalCompletados();
        const precision = this.estado.getPrecision();
        
        // Verificar logros por categoría
        for (let cat = 1; cat <= 4; cat++) {
            if (this.estado.progresoCategorias[cat].completados === 25) {
                const logroId = this.getLogroIdPorCategoria(cat);
                if (!this.estado.medallasDesbloqueadas.includes(logroId)) {
                    nuevosLogros.push(this.getLogroPorCategoria(cat));
                    this.estado.medallasDesbloqueadas.push(logroId);
                }
            }
        }
        
        // Verificar logros globales
        if (totalCompletados >= 50 && !this.estado.medallasDesbloqueadas.includes('cincuenta_ejercicios')) {
            nuevosLogros.push(LOGROS.CINCUENTA_EJERCICIOS);
            this.estado.medallasDesbloqueadas.push('cincuenta_ejercicios');
        }
        
        if (totalCompletados >= 100 && !this.estado.medallasDesbloqueadas.includes('cien_ejercicios')) {
            nuevosLogros.push(LOGROS.CIEN_EJERCICIOS);
            this.estado.medallasDesbloqueadas.push('cien_ejercicios');
        }
        
        // Verificar logros por racha
        if (this.estado.rachaActual >= 50 && !this.estado.medallasDesbloqueadas.includes('racha_50')) {
            nuevosLogros.push(LOGROS.RACHA_CINCUENTA);
            this.estado.medallasDesbloqueadas.push('racha_50');
        } else if (this.estado.rachaActual >= 25 && !this.estado.medallasDesbloqueadas.includes('racha_25')) {
            nuevosLogros.push(LOGROS.RACHA_VEINTICINCO);
            this.estado.medallasDesbloqueadas.push('racha_25');
        } else if (this.estado.rachaActual >= 10 && !this.estado.medallasDesbloqueadas.includes('racha_10')) {
            nuevosLogros.push(LOGROS.RACHA_DIEZ);
            this.estado.medallasDesbloqueadas.push('racha_10');
        }
        
        // Verificar logros por precisión
        if (precision >= 100 && !this.estado.medallasDesbloqueadas.includes('precision_100')) {
            nuevosLogros.push(LOGROS.PRECISION_CIEN);
            this.estado.medallasDesbloqueadas.push('precision_100');
        } else if (precision >= 90 && !this.estado.medallasDesbloqueadas.includes('precision_90')) {
            nuevosLogros.push(LOGROS.PRECISION_NOVENTA);
            this.estado.medallasDesbloqueadas.push('precision_90');
        } else if (precision >= 80 && !this.estado.medallasDesbloqueadas.includes('precision_80')) {
            nuevosLogros.push(LOGROS.PRECISION_OCHENTA);
            this.estado.medallasDesbloqueadas.push('precision_80');
        }
        
        return nuevosLogros;
    }
    
    getLogroIdPorCategoria(cat) {
        const map = {
            1: 'fuertes_completado',
            2: 'debiles_completado',
            3: 'mixtos_completado',
            4: 'especiales_completado'
        };
        return map[cat];
    }
    
    getLogroPorCategoria(cat) {
        const map = {
            1: LOGROS.CATEGORIA_FUERTES,
            2: LOGROS.CATEGORIA_DEBILES,
            3: LOGROS.CATEGORIA_MIXTOS,
            4: LOGROS.CATEGORIA_ESPECIALES
        };
        return map[cat];
    }
    
    mostrarCelebracion(logro) {
        const modal = document.createElement('div');
        modal.className = 'celebracion-modal';
        modal.innerHTML = `
            <div class="celebracion-icono">${logro.icono}</div>
            <div class="celebracion-titulo">${logro.nombre}</div>
            <div class="celebracion-texto">${logro.descripcion}</div>
            <div class="celebracion-puntos">+${logro.puntos} puntos</div>
            <button class="celebracion-boton" onclick="this.parentElement.remove()">Continuar</button>
        `;
        document.body.appendChild(modal);
        
        // Overlay oscuro
        const overlay = document.createElement('div');
        overlay.className = 'celebracion-overlay';
        overlay.onclick = () => {
            modal.remove();
            overlay.remove();
        };
        document.body.appendChild(overlay);
        
        // Reproducir sonido de logro (opcional)
        this.reproducirSonidoLogro();
    }
    
    reproducirSonidoLogro() {
        // Implementar si se desea sonido
        console.log('¡Logro desbloqueado!');
    }
}

// ============================================
// SISTEMA DE CONFETI
// ============================================
class ConfettiSystem {
    constructor() {
        this.canvas = document.getElementById('confettiCanvas');
        this.ctx = this.canvas?.getContext('2d');
        this.particles = [];
        this.animating = false;
    }
    
    lanzar(cantidad = 50) {
        if (!this.canvas || !this.ctx) return;
        
        this.canvas.style.display = 'block';
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.particles = [];
        for (let i = 0; i < cantidad; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                vx: Math.random() * 6 - 3,
                vy: Math.random() * 3 + 2,
                size: Math.random() * 8 + 4,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`
            });
        }
        
        if (!this.animating) {
            this.animating = true;
            this.animar();
        }
        
        setTimeout(() => {
            this.canvas.style.display = 'none';
            this.animating = false;
        }, 2000);
    }
    
    animar() {
        if (!this.animating) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.y > this.canvas.height) {
                p.y = -10;
                p.x = Math.random() * this.canvas.width;
            }
            
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, p.size, p.size);
        });
        
        requestAnimationFrame(() => this.animar());
    }
}

// ============================================
// UTILIDADES
// ============================================
const Utilidades = {
    formatearTiempo(segundos) {
        const mins = Math.floor(segundos / 60);
        const secs = segundos % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    calcularPuntos(ejercicio, racha) {
        let puntos = ejercicio.puntos || CONFIG.PUNTOS_POR_EJERCICIO;
        const bonusRacha = Math.min(racha * 2, CONFIG.BONUS_RACHA_MAX);
        return {
            base: puntos,
            bonus: bonusRacha,
            total: puntos + bonusRacha
        };
    },
    
    calcularEstrellas(puntos) {
        return Math.floor(puntos / CONFIG.ESTRELLAS_POR_PUNTOS);
    },
    
    mezclarArray(array) {
        const nuevo = [...array];
        for (let i = nuevo.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]];
        }
        return nuevo;
    },
    
    guardarProgresoLocal(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error guardando progreso:', e);
            return false;
        }
    },
    
    cargarProgresoLocal(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Error cargando progreso:', e);
            return defaultValue;
        }
    }
};

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.estado = new EstadoPractica();
    window.medallas = new SistemaMedallas(window.estado);
    window.confetti = new ConfettiSystem();
    
    // Configurar auto-guardado
    setInterval(() => {
        if (window.estado) {
            window.estado.guardarTodo();
            console.log('Progreso guardado automáticamente');
        }
    }, CONFIG.TIEMPO_AUTO_GUARDADO);
    
    console.log(`Sistema de práctica v${CONFIG.VERSION} iniciado`);
});

// ============================================
// FUNCIONES GLOBALES (para usar desde HTML)
// ============================================
window.seleccionarCategoria = function(catId) {
    if (!window.estado) return;
    
    window.estado.seleccionarCategoria(catId);
    
    // Quitar selección anterior
    document.querySelectorAll('.categoria-card').forEach(c => c.classList.remove('seleccionada'));
    document.getElementById(`categoria-${catId}`).classList.add('seleccionada');
    
    // Mostrar panel de ejercicio
    document.getElementById('ejercicioPanel').style.display = 'block';
    document.getElementById('logrosPanel').style.display = 'block';
    
    // Actualizar título
    const titulos = {
        1: '🔴 Verbos Transitivos Fuertes',
        2: '🔵 Verbos Transitivos Débiles',
        3: '🟠 Casos Mixtos',
        4: '🟣 Casos Especiales'
    };
    document.getElementById('categoriaActualNombre').textContent = titulos[catId];
    
    window.cargarEjercicio();
};

window.cargarEjercicio = function() {
    if (!window.estado) return;
    
    const ejercicio = window.estado.ejercicios[window.estado.indiceActual];
    if (!ejercicio) return;
    
    // Mostrar oración
    document.getElementById('oracionEjercicio').innerHTML = 
        ejercicio.oracion.replace('_______', '<span class="oracion-blank">______</span>');
    
    // Mostrar verbo
    document.getElementById('verboContainer').style.display = 'block';
    document.getElementById('verboContainer').innerHTML = 
        `<i class="bi bi-pencil"></i> Verbo: <strong>${ejercicio.verbo}</strong>`;
    
    // Generar opciones
    const opcionesContainer = document.getElementById('opcionesContainer');
    opcionesContainer.innerHTML = '';
    
    ejercicio.opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn';
        btn.innerHTML = opcion;
        btn.onclick = () => window.verificarRespuesta(ejercicio.id, opcion, btn);
        
        // Verificar si ya fue respondida
        const key = `${window.estado.categoriaActual}-${ejercicio.id}`;
        const respuestaAnterior = window.estado.respuestasUsuario[key];
        if (respuestaAnterior) {
            btn.disabled = true;
            const esCorrecta = (respuestaAnterior === ejercicio.correcta) || 
                (ejercicio.correcta === 'ambas' && ['de los que', 'que', 'del que', 'de las que'].includes(respuestaAnterior));
            if (esCorrecta) {
                btn.classList.add('correcta');
            } else {
                btn.classList.add('incorrecta');
            }
        }
        
        opcionesContainer.appendChild(btn);
    });
    
    // Ocultar feedback
    document.getElementById('feedbackPanel').style.display = 'none';
    document.getElementById('pistaContent').style.display = 'none';
    
    // Actualizar contador
    document.getElementById('contadorEjercicios').textContent = 
        `${window.estado.indiceActual + 1}/${window.estado.ejercicios.length}`;
    
    // Actualizar progreso circular
    window.actualizarProgresoCircular();
    
    // Actualizar dots de progreso
    window.actualizarProgressDots();
    
    // Actualizar botones de navegación
    document.getElementById('btnAnterior').disabled = window.estado.indiceActual === 0;
    document.getElementById('btnSiguiente').disabled = window.estado.indiceActual === window.estado.ejercicios.length - 1;
};

window.verificarRespuesta = function(ejercicioId, respuesta, boton) {
    if (!window.estado || !window.medallas || !window.confetti) return;
    
    const ejercicio = window.estado.ejercicios.find(e => e.id === ejercicioId);
    if (!ejercicio) return;
    
    // Deshabilitar todos los botones
    document.querySelectorAll('.opcion-btn').forEach(btn => btn.disabled = true);
    
    // Verificar si es correcta
    const esCorrecta = (respuesta === ejercicio.correcta) || 
        (ejercicio.correcta === 'ambas' && ['de los que', 'que', 'del que', 'de las que'].includes(respuesta));
    
    // Marcar botón
    boton.classList.add(esCorrecta ? 'correcta' : 'incorrecta');
    
    // Guardar respuesta
    window.estado.marcarRespuesta(ejercicioId, respuesta, esCorrecta);
    
    if (esCorrecta) {
        // Calcular puntos
        const puntos = Utilidades.calcularPuntos(ejercicio, window.estado.rachaActual);
        
        window.estado.rachaActual++;
        window.estado.puntosTotales += puntos.total;
        
        // Actualizar estrellas
        const nuevasEstrellas = Utilidades.calcularEstrellas(window.estado.puntosTotales);
        if (nuevasEstrellas > window.estado.estrellasTotales) {
            window.estado.estrellasTotales = nuevasEstrellas;
        }
        
        // Mostrar feedback
        Notificador.mostrarExito(ejercicio.explicacion, puntos.total);
        
        // Lanzar confetti
        window.confetti.lanzar(30);
        
        // Verificar logros
        const nuevosLogros = window.medallas.verificarLogros();
        nuevosLogros.forEach(logro => {
            window.medallas.mostrarCelebracion(logro);
        });
        
        // Actualizar UI de progreso
        document.getElementById(`progreso-${window.estado.categoriaActual}`).style.width = 
            (window.estado.progresoCategorias[window.estado.categoriaActual].completados / 25 * 100) + '%';
        document.getElementById(`completados-${window.estado.categoriaActual}`).textContent = 
            window.estado.progresoCategorias[window.estado.categoriaActual].completados;
        
    } else {
        window.estado.rachaActual = 0;
        
        // Mostrar feedback
        Notificador.mostrarError(ejercicio.explicacion, ejercicio.correcta);
        
        // Marcar otras opciones correctas
        document.querySelectorAll('.opcion-btn').forEach(btn => {
            if (btn.textContent === ejercicio.correcta || 
                (ejercicio.correcta === 'ambas' && ['de los que', 'que', 'del que', 'de las que'].includes(btn.textContent))) {
                btn.classList.add('correcta');
            }
        });
    }
    
    // Actualizar estadísticas en vivo
    window.actualizarLiveStats();
    
    // Actualizar dots de progreso
    window.actualizarProgressDots();
    
    // Guardar todo
    window.estado.guardarTodo();
};

window.mostrarPista = function() {
    if (!window.estado) return;
    
    const ejercicio = window.estado.ejercicios[window.estado.indiceActual];
    if (!ejercicio) return;
    
    const pistaContent = document.getElementById('pistaContent');
    pistaContent.innerHTML = `<i class="bi bi-lightbulb"></i> ${ejercicio.pista}`;
    pistaContent.style.display = 'block';
};

window.navegarEjercicio = function(direccion) {
    if (!window.estado) return;
    
    const nuevoIndice = window.estado.indiceActual + direccion;
    if (nuevoIndice >= 0 && nuevoIndice < window.estado.ejercicios.length) {
        window.estado.indiceActual = nuevoIndice;
        window.cargarEjercicio();
    }
};

window.actualizarProgresoCircular = function() {
    if (!window.estado) return;
    
    const completados = window.estado.progresoCategorias[window.estado.categoriaActual].completados;
    const porcentaje = (completados / 25) * 100;
    const grados = (porcentaje * 360) / 100;
    
    document.getElementById('progresoCircular').style.background = 
        `conic-gradient(#667eea ${grados}deg, #f0f0f0 ${grados}deg)`;
    document.getElementById('progresoPorcentaje').textContent = Math.round(porcentaje) + '%';
};

window.actualizarProgressDots = function() {
    if (!window.estado) return;
    
    const container = document.getElementById('progressDots');
    if (!container) return;
    
    let html = '';
    
    for (let i = 0; i < window.estado.ejercicios.length; i++) {
        const ejercicio = window.estado.ejercicios[i];
        const key = `${window.estado.categoriaActual}-${ejercicio.id}`;
        const respondido = window.estado.respuestasUsuario[key];
        const esCorrecto = window.estado.respuestasUsuario[`${key}_correcto`];
        
        let clase = 'progress-dot';
        if (i === window.estado.indiceActual) clase += ' active';
        else if (esCorrecto) clase += ' completed';
        else if (respondido) clase += ' visited';
        
        html += `<span class="${clase}" onclick="window.saltarAEjercicio(${i})"></span>`;
    }
    
    container.innerHTML = html;
};

window.saltarAEjercicio = function(index) {
    if (!window.estado) return;
    
    window.estado.indiceActual = index;
    window.cargarEjercicio();
};

window.saltarAleatorio = function() {
    if (!window.estado) return;
    
    window.estado.indiceActual = Math.floor(Math.random() * window.estado.ejercicios.length);
    window.cargarEjercicio();
};

window.reiniciarCategoria = function() {
    if (!window.estado || !confirm('¿Seguro que quieres reiniciar el progreso de esta categoría?')) return;
    
    const catId = window.estado.categoriaActual;
    
    // Eliminar respuestas de esta categoría
    Object.keys(window.estado.respuestasUsuario).forEach(key => {
        if (key.startsWith(`${catId}-`)) {
            delete window.estado.respuestasUsuario[key];
        }
    });
    
    // Reiniciar progreso
    window.estado.progresoCategorias[catId] = { completados: 0, estrellas: 0 };
    
    // Guardar
    window.estado.guardarTodo();
    
    // Recargar
    window.cargarEjercicio();
    window.actualizarProgresoCircular();
    
    // Actualizar UI de categoría
    document.getElementById(`progreso-${catId}`).style.width = '0%';
    document.getElementById(`completados-${catId}`).textContent = '0';
    
    Notificador.mostrarInfo('Progreso de la categoría reiniciado');
};

window.actualizarLiveStats = function() {
    // Esta función se conecta con las estadísticas del servidor
    // Por ahora solo actualiza lo local
    if (document.getElementById('puntos-totales')) {
        document.getElementById('puntos-totales').textContent = window.estado?.puntosTotales || 0;
    }
    if (document.getElementById('racha-actual')) {
        document.getElementById('racha-actual').textContent = window.estado?.rachaActual || 0;
    }
    if (document.getElementById('estrellas')) {
        document.getElementById('estrellas').textContent = window.estado?.estrellasTotales || 0;
    }
};

// Exportar utilidades para debugging
window.debug = {
    estado: () => console.log(window.estado),
    medallas: () => console.log(window.medallas),
    reset: () => {
        localStorage.clear();
        location.reload();
    }
};
