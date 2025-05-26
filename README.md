# PWA de Gestión de Tareas - Prueba Técnica Full Stack (Increacity)

## Justificación de la Elección de Tecnologías Utilizadas

### **Frontend:**

- **Angular**: Elegí Angular debido a mi experiencia previa trabajando con este framework. Su arquitectura modular facilita la organización del código, y su integración nativa con Service Workers lo hace ideal para la creación de aplicaciones SPA (Single Page Applications) que requieren características de PWA.
- **Angular Service Worker**: Esta herramienta se utiliza para convertir la aplicación en una PWA, habilitando características como el almacenamiento en caché y la operación sin conexión. Al ser una implementación oficial de Angular, se integra fácilmente con el resto del ecosistema Angular.

- **IndexedDB**: Se eligió para el almacenamiento local de tareas cuando el usuario está offline. IndexedDB es una base de datos en el navegador que permite almacenar grandes cantidades de datos estructurados de manera persistente. Esto es crucial para que la aplicación funcione sin conexión a Internet y luego sincronice los datos cuando se recupere la conexión.

- **RxJS**: Utilizado para manejar la reactividad de los datos en la aplicación, particularmente para la detección de cambios en el estado de la red (online/offline). RxJS permite un manejo limpio y eficiente de eventos asincrónicos y flujos de datos.

### **Backend:**

- **Django + Django REST Framework**: Django fue elegido por su rapidez de desarrollo y facilidad para configurar una API RESTful. Su ecosistema incluye herramientas que optimizan la seguridad y el rendimiento, lo cual facilitó la implementación del backend en esta prueba técnica. Además, tengo experiencia previa trabajando con Django y su REST Framework, lo que permitió desarrollar el backend de forma eficiente y rápida.

- **PostgreSQL**: PostgreSQL fue seleccionado como base de datos relacional debido a su confiabilidad y escalabilidad. Aunque en esta prueba se implementó una única tabla para gestionar las tareas, PostgreSQL es una opción sólida que garantiza un manejo eficiente de los datos, asegurando que las tareas se almacenen de manera estructurada y consistente.

---

## Descripción de la Implementación de Sincronización Offline/Online

La aplicación permite registrar tareas en modo **offline** y sincronizarlas automáticamente cuando el usuario recupere la conexión a Internet.

### **Sincronización Offline:**

1. **Almacenamiento Local con IndexedDB**: Cuando el usuario crea una tarea sin conexión, esta se almacena localmente en el navegador utilizando IndexedDB. Esto permite que la aplicación funcione sin conexión y que las tareas sean accesibles en cualquier momento.

2. **Estado de las Tareas**: Cada tarea almacenada en IndexedDB tiene un estado que indica si ha sido sincronizada o no con el backend. Al estar offline, las tareas se mantienen con el estado `sincronizado = false`.

### **Sincronización Online:**

1. **Detección de Conexión a Internet**: Cuando el dispositivo recobra la conexión a Internet, la aplicación detecta este cambio y comienza el proceso de sincronización.

2. **Sincronización Automática**: Las tareas que se almacenaron de manera local y que aún no han sido sincronizadas se envían al backend para ser almacenadas. Si la sincronización es exitosa, el estado de cada tarea se actualiza a `sincronizado = true` tanto en el frontend como en la base de datos del backend.

3. **Manejo de Errores**: Si ocurre un error durante la sincronización (por ejemplo, si el backend no está disponible o hay problemas de red), la tarea se mantiene en el estado `sincronizado = false` y se reintenta la sincronización después de un intervalo.

---

## Detalles Técnicos Relevantes

### **Uso de Almacenamiento Local (IndexedDB)**

- **IndexedDB** se utiliza para almacenar las tareas de manera persistente cuando el usuario está sin conexión. Esta base de datos local permite que la aplicación siga funcionando incluso cuando el dispositivo no tiene acceso a Internet. Los datos permanecen almacenados en el navegador hasta que el dispositivo se reconecte a la red y pueda sincronizarse con el backend.

### **Política de Reintento**

- En caso de que la sincronización de tareas falle (por ejemplo, debido a problemas de red o en el servidor), la tarea permanece en IndexedDB con el estado `sincronizado = false`. La aplicación implementa una política de reintentos que asegura que las tareas se intenten sincronizar de nuevo después de un tiempo, sin necesidad de intervención del usuario.

### **Manejo de Errores**

- Si una tarea se sincroniza correctamente, se elimina de IndexedDB y su estado se marca como `sincronizado = true` en el backend.

- Si una tarea no se puede sincronizar debido a un error (por ejemplo, un error de red o si el backend no está disponible), la tarea permanece en IndexedDB con el estado `sincronizado = false`. Esto permite que la tarea siga disponible para futuros intentos de sincronización.

- La aplicación maneja los errores de manera que las tareas no se pierdan. Mientras una tarea no se sincronice correctamente, se mantiene en IndexedDB con su estado actualizado (es decir, `sincronizado = false`). Solo se elimina de la memoria local (IndexedDB) una vez que la tarea haya sido sincronizada correctamente con el backend y se haya marcado como `sincronizado = true`.

### **RxJS y Conectividad**

- **RxJS** se utiliza para gestionar la conectividad del cliente. Los eventos de red (conexión y desconexión) son manejados de manera reactiva, lo que permite a la aplicación sincronizar las tareas en el momento adecuado sin intervención del usuario. RxJS también ayuda a manejar de manera eficiente la comunicación entre los componentes del frontend y los servicios de sincronización.

---

Este archivo `README.md` proporciona un resumen claro y conciso de la justificación de las tecnologías, la implementación de la sincronización offline/online y los detalles técnicos de la aplicación.
