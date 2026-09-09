# Dashboard

Dashboard es una aplicación personal para organizar tareas, eventos, gastos, hábitos y notas desde un solo lugar.

Está pensada para uso diario, con una interfaz simple, rápida y responsive que permite revisar y actualizar información sin cambiar entre varias herramientas.

## Características

- Gestión de tareas por estados
- Creación, edición y eliminación de tareas
- Calendario con eventos
- Gestión de gastos
- Seguimiento de hábitos
- Notas rápidas
- Navegación entre secciones
- Scroll a secciones específicas
- Autenticación de usuarios
- Persistencia de datos con Supabase
- Diseño responsive para desktop y mobile

## Módulos

### Tareas

Permite organizar tareas según su estado y moverlas a medida que avanzan.

Incluye:

- creación de tareas
- edición
- eliminación
- cambio de estado
- agrupación visual por columnas

### Calendario

Permite registrar y consultar eventos por fecha.

Incluye:

- navegación entre meses
- creación de eventos
- edición
- eliminación
- visualización de próximos eventos

### Gastos

Permite registrar y consultar gastos personales desde el dashboard.

### Hábitos

Permite llevar un seguimiento simple de hábitos y progreso diario.

### Notas

Espacio para guardar información rápida y tenerla disponible dentro del mismo dashboard.

## Tecnologías

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- lucide-react

## Arquitectura

El proyecto utiliza una estructura basada en providers y hooks separados por dominio.

Esto permite mantener la lógica de cada módulo aislada de sus componentes de presentación y facilita el mantenimiento de la aplicación.

## Desarrollo local

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env.local` con las variables necesarias:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

## Verificación

Antes de publicar una nueva versión:

```bash
npm run lint
npm run build
npx knip
```

## Estado

Versión funcional para uso diario.

El dashboard reúne en una sola interfaz las herramientas principales de organización personal y continúa evolucionando a partir de su uso real.

## Capturas

<img width="1842" height="923" alt="Captura desde 2026-09-09 09-44-48" src="https://github.com/user-attachments/assets/3c3ecb23-631e-423c-893a-ec00c49334d7" />
<img width="1842" height="923" alt="Captura desde 2026-09-09 09-45-43" src="https://github.com/user-attachments/assets/70ae74d3-2cf4-46c2-beb8-12b28378a992" />
<img width="1842" height="923" alt="Captura desde 2026-09-09 09-46-02" src="https://github.com/user-attachments/assets/c7f923d4-10a8-453a-a668-87f21644791e" />
<img width="1842" height="923" alt="Captura desde 2026-09-09 09-46-10" src="https://github.com/user-attachments/assets/06cceddf-5fa6-4a96-8957-5ae9b7c27874" />

## Vercel URL

https://dashboard-dusky-omega-73.vercel.app/login
