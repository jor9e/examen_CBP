/***********************
  script.js - Banco 100 preguntas bomberiles -> mostrar 20 aleatorias
  Comentado línea por línea (explicación en cada sección)
  - Tipo: opción múltiple 4 alternativas (a,b,c,d)
  - Modo: mostrar explicación de cada respuesta después del examen
  - Corrección: puntaje guardado como número de aciertos (ej. 9) en el CSV
***********************/

/* --------------------
   BANCO: 100 preguntas (mezcladas, en español)
   Cada objeto: { id, q, options: [a,b,c,d], answer: 'a'|'b'|'c'|'d', explanation }
   Temática: Bomberos (incendios, HAZMAT, SCBA, primeros auxilios, rescate, etc.)
   -------------------- */
const PREGUNTAS_100 = [
  {id:1, q:"¿Cuál es la clase de fuego que involucra materiales combustibles sólidos como madera y papel?", options:["Clase A","Clase B","Clase C","Clase D"], answer:"a", explanation:"Los fuegos de Clase A involucran materiales sólidos combustibles como madera, papel y tela."},
  {id:2, q:"¿Qué agente extintor es más apropiado para fuegos de líquidos inflamables (gasolina, aceites)?", options:["Agua a chorro","Espuma o polvo químico","CO₂","Arena"], answer:"b", explanation:"Fuegos de líquidos inflamables (Clase B) se controlan mejor con espuma o polvos específicos; el agua a chorro puede dispersar el combustible y empeorar el incendio."},
  {id:3, q:"¿Qué significa SCBA en protección respiratoria para bomberos?", options:["Self-Contained Breathing Apparatus","Supervised Compressed Breathing Apparatus","Safety Controlled Breathing Aid","Secondary Compressed Breathing Apparatus"], answer:"a", explanation:"SCBA significa Self-Contained Breathing Apparatus — es un equipo autónomo de respiración que suministra aire independiente del ambiente."},
  {id:4, q:"¿Cuál es la presión típica de trabajo de una botella SCBA común en psi (aprox.)?", options:["50-100 psi","300-450 psi","2000-3000 psi","20-50 psi"], answer:"c", explanation:"Las botellas SCBA suelen ser de alta presión: típicamente alrededor de 2000-3000 psi (aprox. 200-300 bar)."},
  {id:5, q:"¿Cuál es el orden RICE (útil en lesiones leves) en primeros auxilios?", options:["Rescue, Isolate, Check, Evacuate","Remove, Immobilize, Cool, Elevate","Rescue, Isolate, Contain, Extract","Recover, Inspect, Care, Evacuate"], answer:"b", explanation:"RICE (Remove/Immobilize/Cool/Elevate) es una guía práctica para lesiones leves: retirar, inmovilizar, enfriar y elevar la extremidad afectada."},
  {id:6, q:"¿Qué diámetro de manguera es común para línea de ataque en incendios estructurales (manejabilidad y caudal)?", options:["1 3/4 pulgadas","1/2 pulgada","3 pulgadas","5 pulgadas"], answer:"a", explanation:"Mangueras de 1 3/4\" (aprox. 44 mm) son comúnmente usadas en ataque interior por balance entre caudal y maniobrabilidad."},
  {id:7, q:"¿Qué indica una lectura alta de LEL en un detector de gases?", options:["Nivel de oxígeno alto","Presencia de atmósfera potencialmente explosiva (vapor/gas combustible)","Temperatura baja","Presencia de agua"], answer:"b", explanation:"LEL (Lower Explosive Limit) alto indica concentración de gas/vapor que puede alcanzar composición explosiva; requiere aislamiento y evacuación."},
  {id:8, q:"Al hacer ventilación vertical en techo, ¿qué precaución es crítica?", options:["No usar herramientas","Asegurar la zona y usar protección contra caídas (línea de vida)","Usar agua mientras se hace corte","Ignorar estructura"], answer:"b", explanation:"Antes de ventilación vertical se debe evaluar la estructura, asegurar el área y usar protección anticaídas por riesgo de colapso."},
  {id:9, q:"¿Qué información proporciona la Ficha de Datos de Seguridad (SDS)?", options:["Solo el color del producto","Propiedades químicas, riesgos, primeros auxilios y medidas de control","Precio de venta","Fabricante únicamente"], answer:"b", explanation:"La SDS (o FDS) describe riesgos, medidas de control, EPP requerido y procedimientos de primeros auxilios para sustancias."},
  {id:10, q:"¿Cuál debe ser la prioridad al llegar a una escena con posible víctimas?", options:["Apagar el fuego primero","Seguridad de equipos y víctimas, evaluación de riesgos y rescate prioritario","Tomar fotos para informe","Esperar órdenes"], answer:"b", explanation:"La prioridad es la seguridad: evaluar riesgos y priorizar rescate de víctimas antes de acciones offensivas si la escena es peligrosa."},
  {id:11, q:"¿Qué equipo de protección personal es imprescindible para entrada ofensiva en incendio estructural?", options:["Casco y guantes mínimos","Ropa de calle","EPP completo estructural + SCBA + guantes y botas","Solo casco"], answer:"c", explanation:"Entrada ofensiva requiere EPP estructural completo (casco, chaqueta, pantalón, botas, guantes) y SCBA para protección respiratoria."},
  {id:12, q:"¿Cuál es la función de la línea de seguridad (lifeline) en rescate vertical?", options:["Decorativa","Proveer anclaje y control para evitar caídas y facilitar rescate","Solo para comunicaciones","No necesaria"], answer:"b", explanation:"La línea de seguridad proporciona un punto seguro y controlado para ascensos/descensos y evita caídas."},
  {id:13, q:"¿Qué clase de fuego corresponden a metales combustibles como sodio o magnesio?", options:["Clase A","Clase B","Clase C","Clase D"], answer:"d", explanation:"Los fuegos de Clase D involucran metales combustibles; requieren agentes secos especiales y técnicas específicas."},
  {id:14, q:"¿Qué significa MAYDAY durante una operación? ", options:["Solicitud de recursos","Emergencia crítica: un bombero en peligro que requiere rescate inmediato","Fin de turno","Mensaje no urgente"], answer:"b", explanation:"MAYDAY es la llamada de socorro que indica que un bombero está en peligro y necesita asistencia inmediata."},
  {id:15, q:"¿Cuál es la prioridad en RCP básica (orden ABC)?", options:["Analgesia, Brecha, Control","Aire (Airway), Respiración (Breathing), Circulación (Circulation)","Atender heridas, Botiquín, Comunicar","Aislar, Botiquín, Control"], answer:"b", explanation:"ABC prioriza abrir vía aérea, asegurar respiración y luego circulación para preservar vida."},
  {id:16, q:"¿Qué color de humo suele indicar combustión de hidrocarburos/plásticos (alto riesgo)?", options:["Humo blanco","Humo negro y denso","Humo verde","Humo rosa"], answer:"b", explanation:"Humo negro y denso normalmente indica combustión de hidrocarburos (plásticos, aceites) con mayor temperatura y riesgo."},
  {id:17, q:"¿Qué es un 'punto caliente' durante remoción de escombros?", options:["Lugar frío","Área con brasas o combustión latente que requiere enfriamiento","Lugar para descanso","Punto de encuentro"], answer:"b", explanation:"Puntos calientes son lugares con combustión latente que pueden reavivar el fuego si no se enfrían adecuadamente."},
  {id:18, q:"¿Qué significa LEL?", options:["Low Energy Level","Lower Explosive Limit (Límite Inferior Explosivo)","Large Emission Level","Low Environmental Limit"], answer:"b", explanation:"LEL indica la concentración mínima de vapor/gas combustible en aire que puede explotar."},
  {id:19, q:"¿Qué técnica reduce riesgo de backdraft (retroalimentación explosiva)?", options:["Abrir ventanas rápidamente","Ventilación controlada y reconocimiento de signos (humo pulsante, bajo flujo) antes de introducir oxígeno","Introducir grandes cantidades de oxígeno","Ignorar señales"], answer:"b", explanation:"El backdraft ocurre al introducir oxígeno súbitamente; ventilación controlada reduce el peligro."},
  {id:20, q:"¿Cuál es la prioridad antes de conectar una línea a un hidrante?", options:["Abrir al máximo sin purgar","Asegurar el hidrante y purgar el aire lentamente para evitar golpes de ariete","No verificar nada","Sacar fotos"], answer:"b", explanation:"Antes de aplicar presión se debe purgar y controlar para evitar daños por golpes de ariete."},
  {id:21, q:"¿Qué significa HAZMAT?", options:["Hazardous Materials (Materiales peligrosos)","High Zone Material","Hazard Map","Home Zone"], answer:"a", explanation:"HAZMAT es el término para materiales peligrosos que requieren protocolos especiales de manejo."},
  {id:22, q:"¿Qué equipo se usa para cortar carrocerías en rescate vehicular?", options:["Cizallas hidráulicas (Jaws of Life)","Hacha pequeña","Sierra manual","Cortador de alambre"], answer:"a", explanation:"Herramientas hidráulicas permiten cortar y separar estructuras metálicas para liberar víctimas."},
  {id:23, q:"¿Qué indicador sugiere colapso inminente de techo?", options:["Silencio","Deformación visible, crujidos y separación de elementos estructurales","Olor a café","Baja temperatura"], answer:"b", explanation:"Deformación y crujidos son señales claras de posible colapso y requieren evacuación."},
  {id:24, q:"¿Qué agente es inapropiado para fuegos de metales (Clase D)?", options:["Polvo metálico especializado","Agua a presión","Polvo seco específico","Aislamiento con arena (en algunos casos)"], answer:"b", explanation:"El agua puede reaccionar violentamente con metales combustibles; se usan polvos secos tipo Clase D."},
  {id:25, q:"¿Qué dispositivo ayuda a detectar CO (monóxido de carbono)?", options:["Barómetro","Detector de monóxido de carbono (CO)","Termómetro","Medidor de pH"], answer:"b", explanation:"Detectores de CO miden niveles de monóxido de carbono y advierten de riesgo de intoxicación."},
  {id:26, q:"¿Qué es un SOP (en gestión de incidentes)?", options:["Signal Of Panic","Standard Operating Procedure (Procedimiento Operativo Estándar)","Safety Of Personnel","Simple Operative Plan"], answer:"b", explanation:"SOP son procedimientos estandarizados que guían acciones seguras y consistentes en emergencias."},
  {id:27, q:"¿Qué significa 'hot zone' en HAZMAT?", options:["Zona segura","Zona caliente con peligro inmediato y acceso restringido con EPP completo","Zona de descanso","Zona administrativa"], answer:"b", explanation:"Hot zone es el área inmediata de peligro donde solo personal con EPP y autorización debe entrar."},
  {id:28, q:"¿Cuál es la técnica recomendada para entrar en ambientes con humo denso?", options:["Avanzar erguido","Mantenerse en posición baja (cerca del piso) y usar guía manual/pared","Correr sin protección","Gritar sin mover"], answer:"b", explanation:"El aire más fresco y visibilidad están cerca del piso; avanzar en posición baja reduce exposición térmica y tóxica."},
  {id:29, q:"¿Qué hacer si un extintor no controla un fuego pequeño?", options:["Seguir intentando sin pensar","Retirarse a distancia segura, avisar y pedir apoyo profesional","Volver a aplicar sin cambiar","Ignorar el fuego"], answer:"b", explanation:"Si el extintor no controla el fuego, retroceder y solicitar apoyo evita poner en riesgo al operador."},
  {id:30, q:"¿Qué responsabilidad tiene el oficial de seguridad en una escena grande?", options:["Cocinar para el equipo","Supervisar condiciones de seguridad y detener operaciones inseguras","Tomar fotos para redes","Solo dar órdenes"], answer:"b", explanation:"El oficial de seguridad monitorea riesgos y puede detener operaciones para proteger al personal."},
  {id:31, q:"¿Qué instrumento detecta puntos calientes en escombros o estructuras?", options:["Radio","Cámara termográfica (infrarroja)","Linterna","Metro"], answer:"b", explanation:"Las cámaras termográficas localizan diferencias de temperatura y ayudan a identificar puntos calientes ocultos."},
  {id:32, q:"¿Cuál es la acción inicial ante una fuga de gas desconocida en área pública?", options:["Encender luces","Aislar y evacuar la zona, cortar fuentes de ignición y notificar autoridades","Abrir ventanas y entrar","Tomar muestras sin protección"], answer:"b", explanation:"Sin información se debe aislar, evacuar y notificar a HAZMAT o autoridades; evitar cualquier fuente de ignición."},
  {id:33, q:"¿Qué indica humo claro y pálido en un incendio?", options:["Combustible plástico","Combustión temprana de materiales orgánicos con baja temperatura","Explosión inminente","Humo tóxico exclusivamente"], answer:"b", explanation:"Humo pálido suele indicar combustión de materiales con menor contenido de hidrocarburos y temperaturas más bajas."},
  {id:34, q:"¿Qué práctica evita golpes de ariete al abrir líneas de agua?", options:["Abrir boquillas a tope instantáneamente","Abrir válvulas gradualmente y purgar aire","Cerrar todo de golpe","Cambiar mangueras frecuentemente"], answer:"b", explanation:"Abrir las válvulas gradualmente y purgar aire previene picos de presión dañinos conocidos como golpes de ariete."},
  {id:35, q:"¿Qué es la maniobra de Heimlich indicada para?", options:["Heridas cortantes","Obstrucción de la vía aérea por cuerpo extraño en adulto consciente","Intoxicación","Fractura de columna"], answer:"b", explanation:"La maniobra de Heimlich está indicada para expulsar cuerpos extraños que obstruyen la vía aérea en un adulto consciente."},
  {id:36, q:"¿Qué precaución al utilizar agua en incendios con materiales reactivos (ej. sodio)?", options:["Usar más agua","No usar agua; puede reaccionar violentamente; usar agente seco apropiado","Usar agua caliente","Agregar jabón"], answer:"b", explanation:"Algunos metales reaccionan con agua; se deben usar agentes especiales y técnicas apropiadas de clase D."},
  {id:37, q:"¿Qué elemento es crítico en la inspección diaria de un SCBA?", options:["Color de la botella","Presión de la botella y revisión de alarmas, mascarilla y mangueras","Marca","Tamaño"], answer:"b", explanation:"La inspección diaria verifica presión, integridad y funcionamiento de alarmas y mascarilla para seguridad."},
  {id:38, q:"¿Qué debe hacer un bombero si se desorienta dentro de una estructura con humo? ", options:["Seguir adelante","Emitir MAYDAY, activar señal y retroceder o esperar rescate","Gritar sin coordinación","Quitarse el equipo"], answer:"b", explanation:"Ante desorientación se debe comunicar MAYDAY y tomar medidas de protección para facilitar rescate."},
  {id:39, q:"¿Cuál es la razón de rotar personal en incidentes largos?", options:["Ahorrar combustible","Evitar fatiga y mantener efectividad y seguridad","Porque es costumbre","Para tomar fotos"], answer:"b", explanation:"La rotación previene fatiga, reduce errores y mantiene la seguridad y eficiencia del equipo."},
  {id:40, q:"¿Qué indica olor fuerte a gas en una escena? ", options:["Ambiente seguro","Fuga de gas: riesgo de explosión; aislar, evacuar y notificar","Solo perfume","Señal de alarma falsa"], answer:"b", explanation:"Olor fuerte a gas sugiere fuga; se deben tomar medidas inmediatas de aislamiento y notificación."},
  {id:41, q:"¿Qué relación compresión-ventilación se recomienda en RCP para adultos con un solo rescatista?", options:["15:2","30:2","50:5","10:1"], answer:"b", explanation:"La relación recomendada por guías es 30 compresiones por 2 ventilaciones en RCP para adultos cuando hay un rescatista que ventila."},
  {id:42, q:"¿Qué herramienta combina Halligan y hacha para forzamiento?", options:["Sierra y martillo","Halligan y hacha (combinación clásica)","Cuchillo y cuerda","Llave inglesa"], answer:"b", explanation:"La combinación Halligan + hacha es herramienta estándar para forzamiento de accesos en rescate/incidentes."},
  {id:43, q:"¿Qué hace la espuma al aplicarse sobre un derrame de combustible? ", options:["Aumenta vapores","Suprime vapores y evita re-ignición formando una capa estable","Produce más fuego","No tiene efecto"], answer:"b", explanation:"La espuma cubre la superficie del combustible, suprimiendo vapores y reduciendo riesgo de re-ignición."},
  {id:44, q:"¿Cuál es la práctica correcta al encontrar una víctima consciente pero con posible lesión de columna? ", options:["Arrastrar rápidamente","Inmovilizar columna cervical y trasladar con equipo entrenado","Mover sin pensar","Pedir fotos"], answer:"b", explanation:"En sospecha de lesión medular se inmoviliza la columna (collar cervical y tabla) y se moviliza con cuidado por personal capacitado."},
  {id:45, q:"¿Qué indica humo espeso, oscuro y con olor acre? ", options:["Baja temperatura","Combustión de materiales sintéticos con gases tóxicos; mayor peligro inhalatorio","Humo de vapor de agua","Señal de seguridad"], answer:"b", explanation:"Humo oscuro y acre suele contener productos tóxicos de combustión de materiales sintéticos; riesgo respiratorio elevado."},
  {id:46, q:"¿Qué es un 'backdraft'? ", options:["Inicio lento de fuego","Explosión por entrada súbita de oxígeno en atmósfera rica en combustibles calientes","Sistema de ventilación","Tipo de extintor"], answer:"b", explanation:"Backdraft ocurre cuando se introduce oxígeno a un compartimento con combustibles calientes y poco oxígeno, provocando ignición violenta."},
  {id:47, q:"¿Cuál es la acción ante una hemorragia arterial masiva?", options:["Aplicar calor","Presión directa fuerte y/o torniquete según protocolo y transporte rápido","Esperar","Poner ungüentos"], answer:"b", explanation:"Presión directa y torniquete en hemorragias arteriales masivas son medidas para controlar pérdida sanguínea."},
  {id:48, q:"¿Qué se debe verificar antes de usar una escalera extensible? ", options:["Que tenga pegatinas","Estado general, aseguramiento de base, ángulo y que esté en buen estado estructural","Que sea roja","Que esté limpia"], answer:"b", explanation:"Inspeccionar la escalera y asegurar la base/ángulo es esencial para seguridad durante operaciones."},
  {id:49, q:"¿Qué significa 'SDS' o 'FDS' en manejo de sustancias? ", options:["Safety Data Sheet / Ficha de Datos de Seguridad","Sistema de Datos Sencillos","Señal de Desalojo Simple","Standard Data System"], answer:"a", explanation:"SDS (FDS) contiene información sobre riesgos, manejo, EPP y primeros auxilios de una sustancia."},
  {id:50, q:"¿Qué acción es incorrecta cerca de cables eléctricos caídos? ", options:["Tratar como energizados y mantener distancia","Tocarlos para comprobar si hay corriente","Señalizar y coordinar con compañía eléctrica","Aislar el área"], answer:"b", explanation:"Nunca tocar cables caídos; tratarlos como energizados, señalizar y coordinar con la compañía."},
  {id:51, q:"¿Qué es una 'línea de relevo' en ataque interior? ", options:["Línea de agua de respaldo para apoyar y relevar al equipo de ataque principal","Una cuerda de seguridad","Un inventario","Un informe"], answer:"a", explanation:"La línea de relevo proporciona respaldo de agua y seguridad para el equipo que ataca el fuego."},
  {id:52, q:"¿Qué signo puede indicar intoxicación por monóxido de carbono? ", options:["Mejor tono de piel","Cefalea, náuseas, mareo y confusión","Mejor visión","Sed intensa"], answer:"b", explanation:"El CO produce síntomas inespecíficos como cefalea, náuseas y confusión; puede llevar a pérdida de conciencia."},
  {id:53, q:"¿Cuál es la prioridad con víctimas múltiples en triage?", options:["Atender primero al que grita más","Clasificar por probabilidad de supervivencia y prioridad de atención","Atender primero al más cercano","Atender primero al último en llegar"], answer:"b", explanation:"Triage organiza recursos para maximizar supervivencia priorizando quienes más se benefician."},
  {id:54, q:"¿Qué instrumento se usa para medir la humedad relativa? ", options:["Termómetro","Higrómetro","Barómetro","Anemómetro"], answer:"b", explanation:"El higrómetro mide la humedad relativa del ambiente."},
  {id:55, q:"¿Qué se debe hacer si hay sospecha de contaminación química en un bombero? ", options:["Ignorar","Descontaminar en área controlada, quitar ropa contaminada y seguir protocolo SDS","Llevarlo a casa","Dejarlo descansar"], answer:"b", explanation:"La descontaminación controlada y seguimiento de protocolos protege a la víctima y al equipo."},
  {id:56, q:"¿Qué equipo impide que un bombero se asfixie por humos tóxicos? ", options:["Máscara quirúrgica","SCBA (equipo autónomo de respiración)","Gafas de sol","Guantes de lona"], answer:"b", explanation:"El SCBA provee aire respirable independiente del ambiente donde hay humos tóxicos."},
  {id:57, q:"¿Cuál es la finalidad de la ventilación en incendios estructurales? ", options:["Hacer ruido","Eliminar humo y gases calientes para mejorar visibilidad y condiciones de trabajo","Aumentar fuego","Pintar paredes"], answer:"b", explanation:"La ventilación controlada mejora condiciones internas reduciendo humo y temperatura."},
  {id:58, q:"¿Qué tipo de extintor se recomienda para incendios eléctricos energizados? ", options:["Extintor de agua","Extintor de polvo ABC o CO₂","Extintor de gasolina","Extintor de arena"], answer:"b", explanation:"Extintores en polvo ABC o CO₂ no conducen electricidad y son adecuados para fuegos eléctricos."},
  {id:59, q:"¿Qué indicador en una estructura puede sugerir presencia de almacén con materiales peligrosos? ", options:["Puertas pintadas","Etiquetas HAZMAT, paneles naranja o señalización y olor/actividad anómala","Luces apagadas","Ropa en el suelo"], answer:"b", explanation:"Etiquetas, paneles y comportamiento anómalo indican posible presencia de materiales peligrosos."},
  {id:60, q:"¿Qué hace la cámara termográfica en labores post-incendio? ", options:["Tomar fotografías convencionales","Detectar puntos calientes en superficies que indican combustión latente","Medir sonido","Medir pH"], answer:"b", explanation:"La cámara termográfica identifica zonas con temperatura elevada para detectar puntos calientes ocultos."},
  {id:61, q:"¿Cuál es la actitud correcta ante dudas sobre la naturaleza de un derrame químico? ", options:["Actuar sin equipo","Aislar, evacuar y solicitar unidad HAZMAT con SDS","Intentar limpiar con personal sin protección","Ignorar"], answer:"b", explanation:"Ante incertidumbre se debe aislar, evacuar y pedir equipo especializado siguiendo SDS."},
  {id:62, q:"¿Cuál es la señal de que una víctima está en shock? ", options:["PIel caliente y rosada","Piel pálida, fría, sudorosa, pulso rápido y presión arterial baja","Risa continua","Dormir profundamente"], answer:"b", explanation:"Signos de shock incluyen piel pálida y fría, pulso rápido y presión baja; requiere atención urgente."},
  {id:63, q:"¿Qué significa 'SOG' en documentación de bomberos?", options:["Señal de operativa general","Standard Operating Guideline (Guía Operativa Estándar)","Sistema operativo general","Sinónimo de SOP"], answer:"b", explanation:"SOG es una guía operativa que complementa SOP con directrices prácticas."},
  {id:64, q:"¿Qué método reduce riesgo de re-ignición en tanques con líquidos inflamables? ", options:["Aplicar agua sin control","Aplicar espuma para suprimir vapores y enfriar superficies","Golpear el tanque","Abrir tanques"], answer:"b", explanation:"La espuma suprime vapores y ayuda a evitar re-ignición en superficies de líquidos inflamables."},
  {id:65, q:"¿Qué precaución al ventilar una habitación con posible atmósfera explosiva?", options:["Abrir de golpe","Ventilar desde puntos seguros y evitar introducir fuentes de ignición; evaluar LEL","Encender ventiladores sin evaluar","Entrar con antorcha"], answer:"b", explanation:"Ventilar una atmósfera potencialmente explosiva requiere evaluación y eliminación de fuentes de ignición."},
  {id:66, q:"¿Qué factor incrementa riesgo en incendios forestales? ", options:["Lluvia intensa","Viento fuerte y combustible seco","Niebla","Temperatura baja"], answer:"b", explanation:"Viento y combustible seco aumentan velocidad y intensidad del fuego forestal."},
  {id:67, q:"¿Qué debe revisarse antes de iniciar maniobra de rescate vertical? ", options:["Nada","Anclajes, redundancia, nudos y equipo de protecciones personales","Solo radios","Solo linternas"], answer:"b", explanation:"Revisión de anclajes y redundancia es crítica en rescate vertical para seguridad del equipo y víctimas."},
  {id:68, q:"¿Qué acción inicial ante incendio eléctrico en panel de combustible? ", options:["Usar agua","Cortar energía (si es seguro) y usar agente no conductor (CO₂ o polvo)","Romper panel con manos","Evitar llamar al electricista"], answer:"b", explanation:"Cortar energía (si es posible) y usar extintores adecuados evita riesgos eléctricos adicionales."},
  {id:69, q:"¿Qué tipo de señalización llevan vehículos que transportan materiales peligrosos?", options:["Números UN y paneles naranjas/placas de peligro","Sólo nombre del conductor","Ninguna","Sólo luces"], answer:"a", explanation:"Vehículos HAZMAT usan paneles y números UN para identificar la carga y riesgos."},
  {id:70, q:"¿Cuál es la ventaja de mantener equipo en buen estado e inspecciones regulares?", options:["Ninguna","Reducir fallos en operación, aumentar seguridad y prolongar vida útil del equipo","Solo estética","Mayor costo"], answer:"b", explanation:"El mantenimiento previene fallos, aumenta seguridad y asegura disponibilidad operativa."},
  {id:71, q:"¿Qué procedimiento seguir al encontrar una víctima inconsciente que respira? ", options:["Moverla sin inmovilizar","Colocarla en posición lateral de seguridad y monitorizar signos vitales","Dejarla en cualquier posición","Hacer fotos"], answer:"b", explanation:"La posición lateral protege vía aérea y reduce riesgo de aspiración si vomita."},
  {id:72, q:"¿Qué se debe evitar al usar herramientas eléctricas cerca de agua? ", options:["Usarlas normalmente","Usar protección IP adecuada, conexiones a tierra y RCD/DR para evitar electrocución","Sumergirlas","No importa"], answer:"b", explanation:"Eliminar riesgo eléctrico implica protección, puesta a tierra y dispositivos de corte diferencial."},
  {id:73, q:"¿Qué es la 'línea caliente' en control de incendios? ", options:["Línea donde hay fogatas de campamento","Zona de mayor peligro con fuego activo (no es para tránsito)","Zona segura","Zona de descanso"], answer:"b", explanation:"La línea caliente contiene fuego activo y exige precaución y EPP completo."},
  {id:74, q:"¿Qué acción prioritaria ante sospecha de derrame corrosivo en piel? ", options:["Frotar con alcohol","Enjuagar abundantemente con agua y retirar ropa contaminada, luego buscar atención médica","Aplicar crema","Encender fuego"], answer:"b", explanation:"La descontaminación inmediata con agua es prioritaria en derrames corrosivos sobre la piel."},
  {id:75, q:"¿Qué es la 'cadena de supervivencia' en paro cardíaco? ", options:["Serie de pasos: reconocimiento, RCP, desfibrilación, atención avanzada","Secuencia de comida","Plan de evacuación","Lista de materiales"], answer:"a", explanation:"La cadena de supervivencia mejora la posibilidad de recuperación con intervenciones tempranas."},
  {id:76, q:"¿Qué se debe hacer si un bombero presenta pérdida de presión en SCBA dentro del edificio? ", options:["Ignorar","Salir inmediatamente y comunicarse; si está atrapado emitir MAYDAY","Seguir operando","Cambiar botella dentro del edificio"], answer:"b", explanation:"La pérdida de presión requiere salida o acción de rescate inmediato; la seguridad respiratoria es prioritaria."},
  {id:77, q:"¿Qué precaución al remover techo con riesgo de caída? ", options:["No usar protección","Usar línea de vida y arnés, asegurar puntos de anclaje y verificar estabilidad estructural","Tirar sin inspección","Usar escaleras inadecuadas"], answer:"b", explanation:"Líneas de vida y anclajes protegen a rescatistas durante labores en altura o tejados inestables."},
  {id:78, q:"¿Qué indica humo de color claro y volumen bajo? ", options:["Combustión en fase inicial o materiales con baja carga de hidrocarburos","Fuego extinto","Explosión inminente","Humo altamente tóxico sin riesgo"], answer:"a", explanation:"Humo claro y en pequeño volumen puede indicar combustión inicial o materiales con menor liberación de vapores."},
  {id:79, q:"¿Qué protocolo seguir ante sospecha de incendio en instalación eléctrica crítica? ", options:["Entrar sin coordinar","Coordinar con energía, cortar suministro si es seguro y usar agentes no conductores","Esperar y no actuar","Usar agua a presión sobre paneles energizados"], answer:"b", explanation:"Coordinar corte de energía y usar agentes adecuados evita electrocuciones y daños mayores."},
  {id:80, q:"¿Cuál es la ventaja de usar cámara termográfica en inspección post-incendio? ", options:["Nada","Detectar puntos calientes ocultos que podrían re-igniciar","Solo hacer fotos bonitas","Solo para jefes"], answer:"b", explanation:"Identificar puntos calientes permite enfriamiento focalizado y reduce re-ignición."},
  {id:81, q:"¿Qué es un 'sector de comando' en un incidente grande? ", options:["Puesto de mando para organizar funciones: comando, operaciones, logística, planificación","Un puesto de comida","Solo una carpa","Lugar para descanso"], answer:"a", explanation:"El sector de comando organiza la respuesta, distribuye tareas y coordina recursos."},
  {id:82, q:"¿Qué se debe hacer antes de mover una víctima con posible lesión de columna? ", options:["Mover sin inmovilizar","Inmovilizar columna cervical y usar técnica de extracción adecuada","Arrastrar rápidamente","Ignorar"], answer:"b", explanation:"Inmovilizar antes de mover reduce riesgo de daño neurológico si hay lesión vertebral."},
  {id:83, q:"¿Qué medida tomar si una manguera sufre rotura bajo presión? ", options:["Tirar y dejarla","Cerrar la válvula principal, asegurar zona y reemplazar o reparar la manguera","Ignorar","Seguir usando"], answer:"b", explanation:"Cerrar suministro y aislar evita lesiones por latigazos y pérdida de control del agua."},
  {id:84, q:"¿Qué representa el número UN en paneles HAZMAT? ", options:["Código de producto","Número de identificación UN que indica la sustancia peligrosa y guía para respuesta","Código postal","Número de serie del vehículo"], answer:"b", explanation:"El número UN identifica la sustancia y orienta sobre riesgos y respuesta según guías."},
  {id:85, q:"¿Qué debe incluir una inspección previa de vehículo de bomberos? ", options:["Solo combustible","Revisión de mangueras, bombas, niveles, equipo de respiración y estado general","Solo ruedas","Solo limpieza"], answer:"b", explanation:"Inspección diaria asegura operatividad: mangueras, bombas, SCBA, niveles y EPP."},
  {id:86, q:"¿Qué evitar al usar generadores eléctricos en zona húmeda? ", options:["Usarlos sin protección adecuada","Usar RCD/DR, conexiones a tierra y mantener equipo fuera de contacto directo con agua","Sumergirlos","Usar cables dañados"], answer:"b", explanation:"Protecciones eléctricas y mantener el generador seco son medidas esenciales para evitar electrocución."},
  {id:87, q:"¿Cuál es la conducta ante humo en compartimiento que no se ventila? ", options:["Abrir puertas violentamente","Evaluar y ventilar controladamente, evitar introducir oxígeno súbito que cause backdraft","Encender ventanas","Salir corriendo"], answer:"b", explanation:"La ventilación controlada y evaluación previa evita condiciones de backdraft."},
  {id:88, q:"¿Qué es la 'línea caliente' vs 'línea fría' en la escena? ", options:["Niveles de temperatura","Hot zone (línea caliente) es área inmediata de peligro; cold zone es área segura para logística y apoyo","No hay diferencia","Solo terminología antigua"], answer:"b", explanation:"Zonificación separa áreas de intervención (hot) y apoyo/logística (cold) para seguridad."},
  {id:89, q:"¿Qué se debe hacer si detectas humo con olor químico fuerte? ", options:["Abrir puertas y ventilar sin más","Aislar, evacuar y notificar HAZMAT; usar SCBA si es necesario","Entrar a investigar sin EPP","Ignorar"], answer:"b", explanation:"El olor químico puede indicar tóxicos; aislar y notificar reduce exposición."},
  {id:90, q:"¿Cuál es la función de un RCD/DR (dispositivo diferencial) en instalaciones eléctricas? ", options:["Aumenta corriente","Corta suministro si detecta fuga a tierra protegiendo contra electrocución","Sube tensión","Reduce ruido"], answer:"b", explanation:"Un RCD/DR detecta corrientes de fuga y corta suministro para proteger a personas de electrocución."},
  {id:91, q:"¿Qué precaución tomar al retirar equipo contaminado? ", options:["Tirarlo en cualquier parte","Hacer descontaminación en zona controlada y manejar residuos según protocolo SDS","Quitarlo y usar en otra escena","Regalarlo"], answer:"b", explanation:"La descontaminación controlada previene exposición secundaria y contaminación del entorno."},
  {id:92, q:"¿Qué es la 'posición lateral de seguridad'? ", options:["Una postura para dormir","Posición para víctima inconsciente que respira: lateralizar para mantener vía aérea despejada","Una técnica de evacuación","Un tipo de camilla"], answer:"b", explanation:"La posición lateral protege la vía aérea de una víctima inconsciente que respira y previene aspiración."},
  {id:93, q:"¿Qué indica humo espeso y negro saliendo por ventanas superiores? ", options:["Combustible ligero y alta temperatura; posible desarrollo rápido y riesgo de flashover","Fuego controlado","Tanque vacío","Nada relevante"], answer:"a", explanation:"Humo negro y denso puede indicar combustión de hidrocarburos y condiciones de alto riesgo térmico."},
  {id:94, q:"¿Cuál es la práctica adecuada si el extintor no es eficaz? ", options:["Volver a intentar eternamente","Retirarse a distancia segura y pedir apoyo especializado","Seguir intentándolo a toda costa","Encender más fuego"], answer:"b", explanation:"Retroceder y pedir apoyo protege al operador y permite medidas más seguras."},
  {id:95, q:"¿Qué se verifica en la inspección de una botella de SCBA? ", options:["Solo color","Presión, válvulas, cintas, integridad y ausencia de daños visibles","Que tenga etiqueta","Que sea del fabricante"], answer:"b", explanation:"Verificar presión y estado físico asegura que la botella funcione correctamente al usarse."},
  {id:96, q:"¿Qué es la neutralización en HAZMAT? ", options:["Encender el químico","Aplicar reacción química controlada para convertir una sustancia peligrosa en menos dañina siguiendo protocolos","Ignorar","Mover sin protección"], answer:"b", explanation:"La neutralización transforma químicamente sustancias peligrosas conforme a procedimientos seguros."},
  {id:97, q:"¿Qué acción reduce la posibilidad de re-ignición tras control del fuego? ", options:["Dejar todo como está","Enfriamiento de puntos calientes y revisión con cámara termográfica","Solo irse","Apagar luces"], answer:"b", explanation:"Enfriar y revisar puntos calientes reduce re-ignición posterior al control del fuego."},
  {id:98, q:"¿Qué se debe hacer si un bombero queda atrapado y no responde en interior? ", options:["Esperar","Emitir MAYDAY, solicitar rescate de compañeros y coordinar acción de búsqueda y rescate","Gritar sin protocolo","Salir sin avisar"], answer:"b", explanation:"Ante bombero atrapado se declara MAYDAY y se coordina rescate inmediato con procedimientos establecidos."},
  {id:99, q:"¿Qué es la práctica de 'sectorización' en incidentes grandes? ", options:["Cortar áreas con pintura","Dividir el incidente en sectores (comando, operaciones, logística) para mejor control","Solo para emergencias médicas","Para inventarios"], answer:"b", explanation:"Sectorizar permite gestionar recursos y operaciones de manera ordenada y segura."},
  {id:100, q:"¿Por qué se rotan equipos en incidentes prolongados? ", options:["Para aburrir al personal","Para evitar fatiga, mantener seguridad y eficiencia","No se rotan","Solo por horario"], answer:"b", explanation:"La rotación previene agotamiento y mantiene la capacidad operativa del equipo."}
];

/* --------------------
   UTILIDADES (funciones de ayuda)
   - shuffleArray: mezcla un array (Fisher-Yates)
   - csvEscape: escapa correctamente cada campo para CSV
   -------------------- */

// Mezcla (Fisher-Yates) para obtener orden aleatorio de preguntas
function shuffleArray(arr){
  const a = arr.slice(); // clona para no modificar array original
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a; // devuelve copia mezclada
}

// Escapa un campo para CSV: duplica comillas internas y encierra todo entre comillas
function csvEscape(value){
  if (value === null || value === undefined) return '""';
  const s = String(value);
  return '"' + s.replace(/"/g, '""') + '"';
}

/* --------------------
   LÓGICA DE PREGUNTAS:
   - seleccionar 20 preguntas aleatorias del banco de 100
   - renderizar esas 20 en la página
   -------------------- */

let preguntasMostradas = [];           // array con las 20 preguntas que se muestran
const TOTAL_MUESTRA = 40;              // número de preguntas por examen (20)

function generarPreguntasAleatorias(){
  // mezclamos todo el banco y tomamos los primeros TOTAL_MUESTRA
  const shuffled = shuffleArray(PREGUNTAS_100);
  preguntasMostradas = shuffled.slice(0, TOTAL_MUESTRA).map((p, idx) => {
    // añadimos displayIndex para referencia en UI (1..20)
    return Object.assign({}, p, { displayIndex: idx + 1 });
  });
}

// Renderiza las preguntas en el contenedor con id 'questions-list'
function renderPreguntas(){
  const container = document.getElementById('questions-list');
  if (!container) return; // si no existe el contenedor, salimos
  container.innerHTML = ""; // limpiamos
  preguntasMostradas.forEach((p, idx) => {
    const qid = `q${idx+1}`; // name para los input radio (q1..q20)
    const div = document.createElement('div');
    div.className = 'q-card';
    // Construimos HTML de las 4 opciones
    const optsHtml = p.options.map((opt, i) => {
      const val = ['a','b','c','d'][i];
      // label con input radio y texto de opción
      return `<label class="opt"><input type="radio" name="${qid}" value="${val}"> ${val}) ${opt}</label>`;
    }).join("");
    // Estructura de la tarjeta de pregunta (incluye ID original)
    div.innerHTML = `
      <div class="q-head">
        <div class="q-title">Pregunta ${idx+1}</div>
        <div class="muted">ID:${p.id}</div>
      </div>
      <div style="margin-top:6px;">${p.q}</div>
      <div class="options">${optsHtml}</div>
    `;
    container.appendChild(div);
  });
}

/* Inicialización: generar y renderizar examen al cargar el script */
function initExam(){
  generarPreguntasAleatorias();
  renderPreguntas();
  const resultadoDiv = document.getElementById('resultado');
  if (resultadoDiv) resultadoDiv.innerHTML = ""; // limpiar resultados previos
}
initExam();

/* --------------------
   FUNCIONALIDAD: recoger respuestas, evaluar, construir CSV y descargar
   - obtenerRespuestas: lee radios seleccionados
   - evaluar: compara con respuestas correctas y construye detalles
   - construirEncabezadoCSV / construirFilaCSV: forman contenido CSV
   -------------------- */

// Obtener respuestas seleccionadas en la UI (array de 20 valores 'a'|'b'|'c'|'d' o "" si no contestó)
function obtenerRespuestas(){
  const respuestas = [];
  for (let i = 0; i < TOTAL_MUESTRA; i++){
    const name = `q${i+1}`;
    const sel = document.querySelector(`input[name="${name}"]:checked`);
    respuestas.push(sel ? sel.value : "");
  }
  return respuestas;
}

// Evaluar respuestas: devuelve puntaje (número de aciertos) y detalles por pregunta
function evaluar(respuestas){
  let puntaje = 0;             // contador de aciertos
  const detalles = [];         // detalles para revisión/explanación
  for (let i = 0; i < TOTAL_MUESTRA; i++){
    const p = preguntasMostradas[i];            // pregunta mostrada en la posición i
    const selected = respuestas[i] || "";       // respuesta seleccionada por el usuario
    const correctLetter = p.answer;             // letra correcta del banco
    const correct = selected && selected === correctLetter; // booleano
    if (correct) puntaje++;                     // si acierta, incrementa puntaje
    // agregamos detalle para la revisión posterior
    detalles.push({
      id: p.id,
      preguntaIndex: i + 1,
      selected: selected,
      correct: correct,
      correctLetter: correctLetter,
      explanation: p.explanation,
      opciones: p.options
    });
  }
  return { puntaje, detalles };
}

// Construir encabezado CSV dinámico (FECHA, NOMBRE, DNI, PUNTAJE, luego Q1_ID,Q1_RESP,Q1_CORR, ... Q20_ID,Q20_RESP,Q20_CORR)
function construirEncabezadoCSV(){
  const headers = ["FECHA","APELLIDOS Y NOMBRES","DNI","PUNTAJE"];
  for (let i = 1; i <= TOTAL_MUESTRA; i++){
    headers.push(`Q${i}_ID`);
    headers.push(`Q${i}_RESP`);
    headers.push(`Q${i}_CORR`);
  }
  return headers.join(",") + "\r\n"; // CRLF para compatibilidad con Excel en Windows
}

// Construir la fila CSV con los datos del examen: FECHA, NOMBRE, DNI, PUNTAJE (como número) y detalles por pregunta
function construirFilaCSV(fecha, nombre, dni, resultadoEval){
  const row = [];
  // Fecha y datos básicos (escapados para CSV)
  row.push(csvEscape(fecha));
  row.push(csvEscape(nombre));
  row.push(csvEscape(dni));
  // ---------- CORRECCIÓN SOLICITADA ----------
  // Guardar solo el número de aciertos como valor numérico (sin comillas) para evitar cualquier
  // interpretación como fecha. No usamos csvEscape() aquí para que el campo quede sin comillas
  // y Excel lo reconozca como número directamente. Ejemplo: 9
  row.push(String(resultadoEval.puntaje)); // convertimos a string sin escapar (sin comillas en CSV)
  // Añadimos por cada pregunta: ID, respuesta del examinado y si estuvo correcta (SI/NO)
  resultadoEval.detalles.forEach(d => {
    row.push(csvEscape(d.id));                // ID de la pregunta (escapado por si acaso)
    row.push(csvEscape(d.selected || ""));    // respuesta seleccionada
    row.push(csvEscape(d.correct ? "SI" : "NO")); // SI/NO para indicar acierto
  });
  return row.join(",") + "\r\n";
}

/* --------------------
   EVENTOS: botones Guardar, Ver Puntuación y Reiniciar
   - 'guardar': evalúa, muestra explicaciones y descarga CSV
   - 'verPuntuacion': muestra puntaje actual en alerta
   - 'reiniciar': genera nuevas 20 preguntas
   -------------------- */

// Evento GUARDAR: valida datos, evalúa, muestra explicación y descarga CSV
document.getElementById('guardar').addEventListener('click', function(){
  // Tomamos nombre y dni desde inputs (validación simple)
  const nombreEl = document.getElementById('nombre');
  const dniEl = document.getElementById('dni');
  const nombre = nombreEl ? (nombreEl.value || "").trim() : "";
  const dni = dniEl ? (dniEl.value || "").trim() : "";

  // Validación básica: ambos campos obligatorios
  if (!nombre || !dni){
    alert("Por favor complete APELLIDOS Y NOMBRES y DNI.");
    return;
  }

  // Recolectar respuestas
  const respuestas = obtenerRespuestas();
  
  // ✅ NUEVA VALIDACIÓN: Verificar que todas las preguntas estén respondidas
  const preguntasSinResponder = respuestas.filter(resp => resp === "").length;
  if (preguntasSinResponder > 0) {
    alert(`Falta seleccionar respuestas. Tiene ${preguntasSinResponder} pregunta(s) sin responder.`);
    return;
  }

  // Evaluar respuestas
  const resultado = evaluar(respuestas);

  // Formatear fecha local en formato YYYY-MM-DD HH:MM:SS (sin comas)
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const fecha = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  // ---------- Mostrar resultados y explicaciones en la página ----------
  const resultadoDiv = document.getElementById('resultado');
  let html = `<div style="margin-bottom:8px;"><strong>Tu puntaje:</strong> ${resultado.puntaje} / ${TOTAL_MUESTRA}</div>`;
  html += `<div style="font-size:13px; color:#374151; margin-bottom:8px;">Fecha: ${fecha}</div>`;
  html += `<div>`;
  // Iteramos detalles para mostrar respuesta seleccionada, correcta y explicación
  resultado.detalles.forEach((d) => {
    const correctaLetra = d.correctLetter;
    const correctaTexto = d.opciones[['a','b','c','d'].indexOf(correctaLetra)];
    const selTexto = d.selected ? d.opciones[['a','b','c','d'].indexOf(d.selected)] : "<em>No respondió</em>";
    html += `<div style="padding:8px; border-radius:6px; margin-bottom:6px; background:#fff; border:1px solid #eef2f6;">
      <div style="font-weight:700;">Pregunta ${d.preguntaIndex} (ID ${d.id})</div>
      <div style="margin-top:6px;">Respuesta seleccionada: <strong>${d.selected || "-"}</strong> — ${selTexto}</div>
      <div>Respuesta correcta: <strong>${correctaLetra}</strong> — ${correctaTexto}</div>
      <div style="margin-top:6px; color:#374151;"><em>Explicación:</em> ${d.explanation}</div>
      <div style="margin-top:6px; font-weight:700; color:${d.correct ? '#059669' : '#dc2626'}">${d.correct ? 'Correcta' : 'Incorrecta'}</div>
    </div>`;
  });
  html += `</div>`;
  if (resultadoDiv) resultadoDiv.innerHTML = html;

  // 🔒 Ocultar el examen una vez guardado
  const formSection = document.getElementById('cuestionario');
  if (formSection) formSection.style.display = "none";

  // ---------- ENVIAR TAMBIÉN A GOOGLE SHEETS (con 20 preguntas y respuestas) ----------
  const sheetURL = "https://script.google.com/macros/s/AKfycbzdF06zXoRhYJ23Q-UKKMWShQ_kTcHd-YNPW7PQh5zGUHJzkbKTH2j1uRjoLGHUhCBCSA/exec";

  // Construimos los datos que enviaremos al Apps Script
  const payload = {
    fecha: fecha,
    nombre: nombre,
    dni: dni,
    puntaje: resultado.puntaje,
    detalles: resultado.detalles.map(d => ({
      id: d.id,
      selected: d.selected || "",
      correct: d.correct
    }))
  };

  // Enviamos todo al Web App de Google Sheets
  fetch(sheetURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(() => console.log("✅ Datos completos enviados a Google Sheets correctamente."))
  .catch(err => console.error("⚠️ Error al enviar a Google Sheets:", err));
});

// Evento VER PUNTUACION: sin descargar, solo calcula y alerta
document.getElementById('verPuntuacion').addEventListener('click', function(){
  const respuestas = obtenerRespuestas();
  const resultado = evaluar(respuestas);
  alert(`Tu puntuación actual es: ${resultado.puntaje} / ${TOTAL_MUESTRA}`);
});

// Evento REINICIAR: genera nuevas 20 preguntas aleatorias (pierde respuestas no guardadas)
document.getElementById('reiniciar').addEventListener('click', function(){
  if (!confirm("¿Generar nuevas 20 preguntas aleatorias? Se perderán las respuestas no guardadas.")) return;
  initExam();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --------------------
   FIN del archivo script.js
   Notas finales:
   - El puntaje se guarda en el CSV como número (ej. 9) en la columna PUNTAJE.
   - Si deseas que el puntaje también aparezca como "9/20" en la UI, lo mostramos en pantalla,
     pero en el CSV queda solo el número para evitar conversiones de fecha en Excel.
   - Si quieres acumular múltiples envíos en un solo archivo almacenado en localStorage,
     o exportar todas las filas de la sesión juntas, puedo agregar esa funcionalidad.
   -------------------- */


// 🔒 BLOQUEO DE CLIC DERECHO Y SELECCIÓN DE TEXTO
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());