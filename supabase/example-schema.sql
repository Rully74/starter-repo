-- =====================================================================
-- ESQUEMA DE EJEMPLO — Starter PWA
-- =====================================================================
-- ESTA TABLA ES SOLO UN EJEMPLO.
--
-- No tienes que usar `example_items` en tu proyecto. Diseña únicamente
-- las tablas que tu proyecto necesite (normalmente 1, máximo 2).
--
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pegar -> Run.
-- =====================================================================


-- 1. Tabla ------------------------------------------------------------

create table public.example_items (
  id          bigint generated always as identity primary key,
  title       text not null,
  description text not null default '',
  status      text not null default 'pending'
              check (status in ('pending', 'in_progress', 'done')),
  created_at  timestamptz not null default now()
);


-- 2. Row Level Security (RLS) ----------------------------------------
-- Con RLS habilitado y SIN políticas, nadie puede acceder desde el
-- frontend. Cada política de abajo abre un permiso concreto.
-- Nunca soluciones un error desactivando RLS de forma permanente.

alter table public.example_items enable row level security;

-- Permite a la API de Supabase trabajar con la tabla. RLS sigue
-- decidiendo qué filas se pueden leer o modificar.
grant select, insert, update on public.example_items to anon, authenticated;


-- 3. Políticas --------------------------------------------------------
-- El starter no usa autenticación, así que las peticiones llegan con el
-- rol `anon` (la Publishable Key). Estas políticas son ABIERTAS: cualquiera
-- que use la app puede leer, crear y actualizar elementos.
-- Es suficiente para demostrar datos compartidos en el curso, pero NO
-- para datos privados o sensibles.

-- Lectura: todos pueden ver todos los elementos.
create policy "Lectura pública de example_items"
  on public.example_items
  for select
  to anon, authenticated
  using (true);

-- Inserción: se permite crear elementos solo si el título no está vacío.
create policy "Crear example_items con título"
  on public.example_items
  for insert
  to anon, authenticated
  with check (char_length(trim(title)) > 0);

-- Actualización: se permite actualizar, manteniendo un título válido.
create policy "Actualizar example_items"
  on public.example_items
  for update
  to anon, authenticated
  using (true)
  with check (char_length(trim(title)) > 0);

-- No hay política de DELETE: desde el frontend NO se puede borrar.
-- Agrégala solo si tu proyecto realmente necesita eliminar registros.


-- 4. Datos de prueba (opcional) ---------------------------------------

insert into public.example_items (title, description, status) values
  ('Primer elemento', 'Creado desde el SQL de ejemplo.', 'pending'),
  ('Segundo elemento', 'Sirve para probar getItems().', 'done');
