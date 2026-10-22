CREATE TABLE rol (
    f_aud          TIMESTAMP,
    b_aud          CHAR(1),
    c_aud_uid      VARCHAR(30),
    c_aud_uidred   VARCHAR(30),
    c_aud_pc       VARCHAR(30),
    c_aud_ip       VARCHAR(15),
    c_aud_mac      VARCHAR(17),

    id_rol         SERIAL PRIMARY KEY,
    rol            VARCHAR(100)
);

CREATE TABLE usuarios (
    f_aud          TIMESTAMP,
    b_aud          CHAR(1),
    c_aud_uid      VARCHAR(30),
    c_aud_uidred   VARCHAR(30),
    c_aud_pc       VARCHAR(30),
    c_aud_ip       VARCHAR(15),
    c_aud_mac      VARCHAR(17),

    id_usuario     SERIAL PRIMARY KEY,
    created_at     TIMESTAMP,
    nombre         VARCHAR(100),
    ap_materno     VARCHAR(100),
    ap_paterno     VARCHAR(100),
    correo         VARCHAR(150),
    telefono       VARCHAR(20),
    username       VARCHAR(100) UNIQUE,
    password       VARCHAR(255),
    id_rol         INTEGER,
    estado         BOOLEAN
);

CREATE TABLE sede ( 
    f_aud          TIMESTAMP,
    b_aud          CHAR(1),
    c_aud_uid      VARCHAR(30),
    c_aud_uidred   VARCHAR(30),
    c_aud_pc       VARCHAR(30),
    c_aud_ip       VARCHAR(15),
    c_aud_mac      VARCHAR(17),

    id_sede        SERIAL PRIMARY KEY,
    created_at     TIMESTAMP,
    sede           VARCHAR(150),
    direccion       VARCHAR(150),
    estado         BOOLEAN
);

CREATE TABLE area (
    f_aud          TIMESTAMP,
    b_aud          CHAR(1),
    c_aud_uid      VARCHAR(30),
    c_aud_uidred   VARCHAR(30),
    c_aud_pc       VARCHAR(30),
    c_aud_ip       VARCHAR(15),
    c_aud_mac      VARCHAR(17),

    id_area        SERIAL PRIMARY KEY,
    created_at     TIMESTAMP,
    area           VARCHAR(150),
    referencia     VARCHAR(150),
    id_sede        INTEGER,
    estado         BOOLEAN

);

CREATE TABLE marca (
    f_aud          TIMESTAMP,
    b_aud          CHAR(1),
    c_aud_uid      VARCHAR(30),
    c_aud_uidred   VARCHAR(30),
    c_aud_pc       VARCHAR(30),
    c_aud_ip       VARCHAR(15),
    c_aud_mac      VARCHAR(17),

    id_marca       SERIAL PRIMARY KEY,
    created_at     TIMESTAMP,
    marca          VARCHAR(100) UNIQUE,
    estado         BOOLEAN
);

CREATE TABLE tipo_equipo (
    f_aud          TIMESTAMP,
    b_aud          CHAR(1),
    c_aud_uid      VARCHAR(30),
    c_aud_uidred   VARCHAR(30),
    c_aud_pc       VARCHAR(30),
    c_aud_ip       VARCHAR(15),
    c_aud_mac      VARCHAR(17),

    id_tipo_equipo SERIAL PRIMARY KEY,
    created_at     TIMESTAMP,
    tipo_equipo    VARCHAR(50) UNIQUE,
    descripcion    VARCHAR(100)
);

CREATE TABLE modelo (
    f_aud          TIMESTAMP,
    b_aud          CHAR(1),
    c_aud_uid      VARCHAR(30),
    c_aud_uidred   VARCHAR(30),
    c_aud_pc       VARCHAR(30),
    c_aud_ip       VARCHAR(15),
    c_aud_mac      VARCHAR(17),

    id_modelo      SERIAL PRIMARY KEY,
    created_at     TIMESTAMP,
    modelo         VARCHAR(150) UNIQUE,
    estado         BOOLEAN,
    id_marca       INTEGER,
	id_tipo_equipo INTEGER
);

CREATE TABLE tipo_consumible (
    f_aud                TIMESTAMP,
    b_aud                CHAR(1),
    c_aud_uid            VARCHAR(30),
    c_aud_uidred         VARCHAR(30),
    c_aud_pc             VARCHAR(30),
    c_aud_ip             VARCHAR(15),
    c_aud_mac            VARCHAR(17),

    id_tipo_consumible   SERIAL PRIMARY KEY,
    created_at           TIMESTAMP,
    tipo_consumible      VARCHAR(100) UNIQUE
);

CREATE TABLE consumible (
    f_aud              TIMESTAMP,
    b_aud              CHAR(1),
    c_aud_uid          VARCHAR(30),
    c_aud_uidred       VARCHAR(30),
    c_aud_pc           VARCHAR(30),
    c_aud_ip           VARCHAR(15),
    c_aud_mac          VARCHAR(17),

    id_consumible      SERIAL PRIMARY KEY,
    created_at         TIMESTAMP,
    nro_parte          VARCHAR(150) UNIQUE,
    id_tipo_consumible INTEGER,
    id_marca           INTEGER
);

CREATE TABLE modelo_consumible (
    f_aud                TIMESTAMP,
    b_aud                CHAR(1),
    c_aud_uid            VARCHAR(30),
    c_aud_uidred         VARCHAR(30),
    c_aud_pc             VARCHAR(30),
    c_aud_ip             VARCHAR(15),
    c_aud_mac            VARCHAR(17),

    id_modelo_consumible SERIAL PRIMARY KEY,
    created_at           TIMESTAMP,
    id_modelo            INTEGER,
    id_consumible        INTEGER
);

CREATE TABLE ticket (
    f_aud              TIMESTAMP,
    b_aud              CHAR(1),
    c_aud_uid          VARCHAR(30),
    c_aud_uidred       VARCHAR(30),
    c_aud_pc           VARCHAR(30),
    c_aud_ip           VARCHAR(15),
    c_aud_mac          VARCHAR(17),

    id_ticket          SERIAL PRIMARY KEY,
    created_at         TIMESTAMP,
    codigo             VARCHAR(16),
    id_area            INTEGER,
    id_modelo          INTEGER,
    ip                 VARCHAR(50),
    id_tipo_consumible INTEGER,
    id_consumible      INTEGER,
    descripcion        TEXT,
    id_usuario         INTEGER,
    
    estado_general     VARCHAR(1),
    id_usuario_ti      INTEGER,
    id_usuario_al      INTEGER,
    ti_mensaje         TEXT,
    al_mensaje         TEXT,
    fecha_ti           DATE,
    fecha_al           DATE,
    estado_ti          BOOLEAN,
    estado_al          BOOLEAN
);

-- FUNCIONES
--TABLA CORRELATIVO

CREATE TABLE correlativo_ticket (
    anio INTEGER PRIMARY KEY,
    ultimo_numero INTEGER NOT NULL
);
ALTER TABLE ticket
ADD CONSTRAINT uq_ticket_codigo UNIQUE(codigo);

CREATE OR REPLACE FUNCTION generar_codigo_ticket()
RETURNS VARCHAR AS
$$
DECLARE
    v_anio INTEGER;
    v_numero INTEGER;
BEGIN
    v_anio := EXTRACT(YEAR FROM CURRENT_DATE);

    INSERT INTO correlativo_ticket(anio, ultimo_numero)
    VALUES (v_anio, 1)
    ON CONFLICT (anio)
    DO UPDATE
    SET ultimo_numero = correlativo_ticket.ultimo_numero + 1
    RETURNING ultimo_numero INTO v_numero;

    RETURN 'REQ-' ||
           RIGHT(v_anio::TEXT, 2) ||
           '-' ||
           LPAD(v_numero::TEXT, 4, '0');
END;
$$
LANGUAGE plpgsql;

--asociamos al codigo
ALTER TABLE ticket
ALTER COLUMN codigo
SET DEFAULT generar_codigo_ticket();

-- RELACIONES
ALTER TABLE usuarios
ADD CONSTRAINT fk_usuario_rol
FOREIGN KEY (id_rol)
REFERENCES rol(id_rol);

ALTER TABLE ticket
ADD CONSTRAINT fk_ticket_usuario
FOREIGN KEY (id_usuario)
REFERENCES usuarios(id_usuario);

ALTER TABLE ticket
ADD CONSTRAINT fk_ticket_area
FOREIGN KEY (id_area)
REFERENCES area(id_area);

ALTER TABLE ticket
ADD CONSTRAINT fk_ticket_modelo
FOREIGN KEY (id_modelo)
REFERENCES modelo(id_modelo);

ALTER TABLE ticket
ADD CONSTRAINT fk_ticket_tipo_consumible
FOREIGN KEY (id_tipo_consumible)
REFERENCES tipo_consumible(id_tipo_consumible);

ALTER TABLE ticket
ADD CONSTRAINT fk_ticket_consumible
FOREIGN KEY (id_consumible)
REFERENCES consumible(id_consumible);

ALTER TABLE ticket
ADD CONSTRAINT fk_ticket_usuario_ti
FOREIGN KEY (id_usuario_ti)
REFERENCES usuarios(id_usuario);

ALTER TABLE ticket
ADD CONSTRAINT fk_ticket_usuario_al
FOREIGN KEY (id_usuario_al)
REFERENCES usuarios(id_usuario);

ALTER TABLE modelo
ADD CONSTRAINT fk_modelo_marca
FOREIGN KEY (id_marca)
REFERENCES marca(id_marca);

ALTER TABLE modelo
ADD CONSTRAINT fk_modelo_tipo_equipo
FOREIGN KEY (id_tipo_equipo)
REFERENCES tipo_equipo(id_tipo_equipo);

ALTER TABLE consumible
ADD CONSTRAINT fk_consumible_tipo
FOREIGN KEY (id_tipo_consumible)
REFERENCES tipo_consumible(id_tipo_consumible);

ALTER TABLE consumible
ADD CONSTRAINT fk_consumible_marca
FOREIGN KEY (id_marca)
REFERENCES marca(id_marca);

ALTER TABLE modelo_consumible
ADD CONSTRAINT fk_modelo_consumible_modelo
FOREIGN KEY (id_modelo)
REFERENCES modelo(id_modelo);

ALTER TABLE modelo_consumible
ADD CONSTRAINT fk_modelo_consumible_consumible
FOREIGN KEY (id_consumible)
REFERENCES consumible(id_consumible);

ALTER TABLE area
ADD CONSTRAINT fk_area_sede
FOREIGN KEY (id_sede)
REFERENCES sede(id_sede);

-- 
INSERT INTO rol (
    id_rol,
    rol,
    f_aud,
    b_aud,
    c_aud_uid,
    c_aud_uidred,
    c_aud_pc,
    c_aud_ip,
    c_aud_mac
) VALUES
(
    1,
    'ADMINISTRADOR',
    CURRENT_TIMESTAMP,
    'I',
    'admin',
    'admin',
    'PC-ADMIN',
    '127.0.0.1',
    '00:00:00:00:00:00'
),
(
    2,
    'INFORMATICA',
    CURRENT_TIMESTAMP,
    'I',
    'admin',
    'admin',
    'PC-ADMIN',
    '127.0.0.1',
    '00:00:00:00:00:00'
),
(
    3,
    'ALMACEN',
    CURRENT_TIMESTAMP,
    'I',
    'admin',
    'admin',
    'PC-ADMIN',
    '127.0.0.1',
    '00:00:00:00:00:00'
),
(
    4,
    'SOLICITANTE',
    CURRENT_TIMESTAMP,
    'I',
    'admin',
    'admin',
    'PC-ADMIN',
    '127.0.0.1',
    '00:00:00:00:00:00'
);
INSERT INTO usuarios (
    created_at,
    nombre,
    ap_materno,
    ap_paterno,
    correo,
    telefono,
    username,
    password,
    id_rol,
    estado,
    f_aud,
    b_aud,
    c_aud_uid,
    c_aud_uidred,
    c_aud_pc,
    c_aud_ip,
    c_aud_mac
) VALUES (
    CURRENT_TIMESTAMP,
    'Administrador',
    '',
    '',
    'admin@admin.com',
    '',
    'admin',
    '$2b$10$qkxKBT7txTI1vf9TTJLatuH1MuWTE9W6/qAt66uw6nfJOrHVc74g.',
    1,
    true,
    CURRENT_TIMESTAMP,
    'I',
    'admin',
    'admin',
    'PC-ADMIN',
    '127.0.0.1',
    '00:00:00:00:00:00'
);


-- TRIGGERS ******************************************************************************************************************
-- ---------------------------------------------------------------------------------------
-- USUARIOS
-- ---------------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_usuarios_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_usuarios_insert
BEFORE INSERT
ON usuarios
FOR EACH ROW
EXECUTE FUNCTION audit_usuarios_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_usuarios_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_usuarios_update
BEFORE UPDATE
ON usuarios
FOR EACH ROW
EXECUTE FUNCTION audit_usuarios_update();
-- 



---------------------------------------------------------------------------------
---MARCAS-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_marcas_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_marcas_insert
BEFORE INSERT
ON marca
FOR EACH ROW
EXECUTE FUNCTION audit_marcas_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_marcas_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_marcas_update
BEFORE UPDATE
ON marca
FOR EACH ROW
EXECUTE FUNCTION audit_marcas_update();
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
---MODELOS-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_modelo_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_modelo_insert
BEFORE INSERT
ON modelo
FOR EACH ROW
EXECUTE FUNCTION audit_modelo_insert();

-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_modelo_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_modelo_update
BEFORE UPDATE
ON modelo
FOR EACH ROW
EXECUTE FUNCTION audit_modelo_update();
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
---
---TIPO DE CONSUMIBLES-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_tipo_consumible_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_tipo_consumible_insert
BEFORE INSERT
ON tipo_consumible
FOR EACH ROW
EXECUTE FUNCTION audit_tipo_consumible_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_tipo_consumible_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_tipo_consumible_update
BEFORE UPDATE
ON tipo_consumible
FOR EACH ROW
EXECUTE FUNCTION audit_tipo_consumible_update();
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
---
--- TIPO DE EQUIPO
-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_tipo_equipo_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_tipo_equipo_insert
BEFORE INSERT
ON tipo_equipo
FOR EACH ROW
EXECUTE FUNCTION audit_tipo_equipo_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_tipo_equipo_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_tipo_equipo_update
BEFORE UPDATE
ON tipo_equipo
FOR EACH ROW
EXECUTE FUNCTION audit_tipo_equipo_update();
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
---
--- CONSUMIBLE
-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_consumible_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_consumible_insert
BEFORE INSERT
ON consumible
FOR EACH ROW
EXECUTE FUNCTION audit_consumible_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_consumible_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_consumible_update
BEFORE UPDATE
ON consumible
FOR EACH ROW
EXECUTE FUNCTION audit_consumible_update();
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
---
--- SEDE
-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_sede_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_sede_insert
BEFORE INSERT
ON sede
FOR EACH ROW
EXECUTE FUNCTION audit_sede_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_sede_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_sede_update
BEFORE UPDATE
ON sede
FOR EACH ROW
EXECUTE FUNCTION audit_sede_update();
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
---
--- AREA
-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_area_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_area_insert
BEFORE INSERT
ON area
FOR EACH ROW
EXECUTE FUNCTION audit_area_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_area_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_area_update
BEFORE UPDATE
ON area
FOR EACH ROW
EXECUTE FUNCTION audit_area_update();
---------------------------------------------------------------------------------
---------------------------------------------------------------------------------
---
--- MODELO_CONSUMIBLE
-------------------------------------------------------------------------------
-- =========================
-- INSERT
-- =========================
CREATE OR REPLACE FUNCTION audit_modelo_consumible_insert()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_modelo_consumible_insert
BEFORE INSERT
ON modelo_consumible
FOR EACH ROW
EXECUTE FUNCTION audit_modelo_consumible_insert();



-- =========================
-- UPDATE
-- =========================

CREATE OR REPLACE FUNCTION audit_modelo_consumible_update()
RETURNS TRIGGER AS
$$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_audit_modelo_consumible_update
BEFORE UPDATE
ON modelo_consumible
FOR EACH ROW
EXECUTE FUNCTION audit_modelo_consumible_update();
---------------------------------------------------------------------------------

-- INSERT DATA///////////////////////////////////////////////////////////////////
-- MARCA--------------------------------------------------------------------------
INSERT INTO marca (
    marca,
    estado,
	created_at,
    f_aud,
    b_aud,
    c_aud_uid,
    c_aud_uidred,
    c_aud_pc,
    c_aud_ip,
    c_aud_mac
)
VALUES
    ('LEXMARK', TRUE, NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('HP', TRUE, NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('XEROX', TRUE, NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('KYOCERA', TRUE, NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('RICOH', TRUE, NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('CANON', TRUE, NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL);


-- TIPO EQUIPO-----------------------------------------------------------------------------------------
INSERT INTO tipo_equipo (
    tipo_equipo,
    descripcion,
	created_at,
    f_aud,
    b_aud,
    c_aud_uid,
    c_aud_uidred,
    c_aud_pc,
    c_aud_ip,
    c_aud_mac
)
VALUES
    ('Multifuncional', 'Equipo que integra funciones de impresión, copia y escaneo.', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Impresora', 'Equipo destinado principalmente a la impresión de documentos.', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Plotter', 'Equipo de impresión de gran formato utilizado para planos, gráficos y documentos especiales.', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL);

-- TIPO CONSUMIBLE -------------------------------------------------------------------------------------
INSERT INTO tipo_consumible (
    tipo_consumible,
	created_at,
    f_aud,
    b_aud,
    c_aud_uid,
    c_aud_uidred,
    c_aud_pc,
    c_aud_ip,
    c_aud_mac
)
VALUES
    ('Toner', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Unidad de imagen', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Kit de mantenimiento', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Cartucho de tinta (negra)', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Cartucho de tinta (tricolor)', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Cartucho de tinta (amarilla)', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Cartucho de tinta (magenta)', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Cartucho de tinta (cian)', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL),
    ('Contenedor de Tóner Residual', NOW(),NOW(), 'I', 'postgres', 'ADMIN', NULL, '127.0.0.1', NULL);

BEGIN;

-- ============================================================
-- SEDES DEL PODER JUDICIAL - CORTE SUPERIOR DE JUSTICIA DE CUSCO
-- ============================================================

INSERT INTO sede (
    created_at,
    sede,
    direccion,
    estado,
    f_aud,
    b_aud,
    c_aud_uid,
    c_aud_uidred,
    c_aud_pc,
    c_aud_ip,
    c_aud_mac
)
SELECT
    NOW(),
    UPPER(datos.sede),
    datos.direccion,
    TRUE,
    NOW(),
    'I',
    'postgres',
    'ADMIN',
    NULL,
    '127.0.0.1',
    NULL
FROM (
    VALUES
        ('ACOMAYO', 'JR. BOLOGNESI S/N - ACOMAYO'),
        ('POMACANCHI', 'PLAZA DE ARMAS S/N - CENTRO CÍVICO'),
        ('ANTA', 'PLAZA CÍVICA S/N - ANTA'),
        ('CALCA', 'CALLE TÚPAC AMARU - URBANIZACIÓN CALCA'),
        ('LA QUEBRADA', 'AV. CALCA S/N ESQUINA CON JR. LARES'),
        ('YANAOCA', 'CENTRO CÍVICO S/N - PLAZA DE ARMAS'),
        ('SICUANI / CANCHIS', 'AV. SAN MARTÍN - SICUANI'),
        ('TINTA / CANCHIS', 'AV. CENTENARIO S/N - TINTA'),
        ('SANTO TOMÁS', '28 DE JULIO LOTE 35 MANZANA C-3'),
        ('LIVITACA', 'CALLE CONCEPCIÓN - LOCAL DEL ALBERGUE MUNICIPAL'),
        ('CUSCO / CUSCO', 'AV. EL SOL 239 - CUSCO'),
        ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', 'VILLA HUANCARO - CUSCO'),
        ('CUSCO/ FAMILIA NO VIOLENCIA', NULL),
        ('CUSCO/ FAMILIA VIOLENCIA', NULL),
        ('CUSCO/EXTINCIÓN - CORRUPCIÓN', NULL),
        ('CUSCO/CONFRATERNIDAD', NULL),
        ('CUSCO/ SHAPY', NULL),
        ('CUSCO/ SANTIAGO', 'AV. AGUSTÍN GAMARRA 160 - CUSCO'),
        ('CUSCO/ SAN JERONIMO', NULL),
        ('CUSCO/ SAN SEBASTIAN', 'AV. DE LA CULTURA - CUSCO'),
        ('ESPINAR', 'JR. ALFONSO UGARTE N.° 312, MZ. R, LT. 17, SUB LT. A - ESPINAR'),
        ('SANTA ANA', 'JR. ESPINAR N.° 148 Y 150 - SANTA ANA, LA CONVENCIÓN'),
        ('ECHARATE', 'CRUCE JR. MARIÁTEGUI CON JR. KAMISEA - ECHARATE'),
        ('VILCABAMBA', NULL),
        ('QUELLOUNO', NULL),
        ('PARURO', 'AV. GRAU MZ. F-1 LOTE 12 - PARURO'),
        ('PAUCARTAMBO', 'CALLE COLÓN S/N - PAUCARTAMBO'),
        ('URCOS', 'CASA DE LA JUVENTUD, JR. MARIANO MELGAR S/N - URCOS'),
        ('OCONGATE', 'CALLE LAGUNILLAS S/N - OCONGATE'),
        ('CAMANTI', 'PLAZA DE ARMAS - QUINCE MIL'),
        ('URUBAMBA', 'JR. COMERCIO S/N - URUBAMBA'),
        ('MACHUPICCHU', 'COMPLEJO CULTURAL, INTERIOR PISO 3 - MACHUPICCHU')
) AS datos(sede, direccion)
WHERE NOT EXISTS (
    SELECT 1
    FROM sede s
    WHERE UPPER(TRIM(s.sede)) = UPPER(TRIM(datos.sede))
);

COMMIT;
BEGIN;

INSERT INTO area (
    created_at,
    area,
    referencia,
    id_sede,
    estado,
    f_aud,
    b_aud,
    c_aud_uid,
    c_aud_uidred,
    c_aud_pc,
    c_aud_ip,
    c_aud_mac
)
SELECT
    NOW(),
    datos.area,
    NULL,
    s.id_sede,
    TRUE,
    NOW(),
    'I',
    'postgres',
    'ADMIN',
    NULL,
    '127.0.0.1',
    NULL
FROM (
    VALUES
    -- ACOMAYO
    ('ACOMAYO', 'JUZGADO MIXTO PENAL LIQUIDADOR EN ADICIÓN DE FUNCIONES JUP DE ACOMAYO'),
    ('ACOMAYO', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE ACOMAYO'),

    -- POMACANCHI
    ('POMACANCHI', 'JUZGADO DE PAZ LETRADO DE POMACANCHI'),

    -- ANTA
    ('ANTA', 'JUZGADO CIVIL DE ANTA'),
    ('ANTA', 'JUZGADO DE PAZ LETRADO DE ANTA'),
    ('ANTA', 'JUZGADO PENAL UNIPERSONAL DE ANTA'),
    ('ANTA', 'JUZGADO DE FAMILIA DE ANTA'),
    ('ANTA', 'JUZGADO DE INVESTIGACIÓN PREPARATORIA - ANTA'),

    -- CALCA
    ('CALCA', 'JUZGADO CIVIL DE CALCA'),
    ('CALCA', 'JUZGADO DE PAZ LETRADO DE CALCA'),
    ('CALCA', 'JUZGADO PENAL UNIPERSONAL EN ADICIÓN DE FUNCIONES PENAL LIQ DE CALCA'),
    ('CALCA', 'JUZGADO DE FAMILIA ESPECIALIZADO EN VIOLENCIA DE CALCA'),
    ('CALCA', 'JUZGADO DE INVESTIGACIÓN PREPARATORIA - CALCA'),

    -- LA QUEBRADA
    ('LA QUEBRADA', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE YANATILE'),

    -- YANAOCA
    ('YANAOCA', 'JUZGADO MIXTO PENAL LIQ. EN ADICIÓN DE FUNCIONES JIP DE CANAS'),
    ('YANAOCA', 'JUZGADO DE PAZ LETRADO DE CANAS'),

    -- SICUANI / CANCHIS
    ('SICUANI / CANCHIS', 'SALA MIXTA DESC. EN ADICIÓN DE FUNCIONES SALA PENAL DE APELACIONES - CANCHIS'),
    ('SICUANI / CANCHIS', '1ER. JUZGADO CIVIL DE CANCHIS'),
    ('SICUANI / CANCHIS', '2DO. JUZGADO CIVIL DE CANCHIS'),
    ('SICUANI / CANCHIS', 'JUZGADO DE FAMILIA DE SICUANI'),
    ('SICUANI / CANCHIS', 'JUZGADO DE FAMILIA ESPECIALIZADO EN VIOLENCIA DE SICUANI'),
    ('SICUANI / CANCHIS', 'JUZGADO DE PAZ LETRADO DE CANCHIS'),
    ('SICUANI / CANCHIS', 'JUZGADO PENAL UNIPERSONAL DE CANCHIS'),
    ('SICUANI / CANCHIS', '1° JUZGADO DE INVESTIGACIÓN PREPARATORIA - CANCHIS'),
    ('SICUANI / CANCHIS', '2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CANCHIS'),

    -- TINTA / CANCHIS
    ('TINTA / CANCHIS', 'JUZGADO DE PAZ LETRADO DE TINTA'),

    -- SANTO TOMÁS
    ('SANTO TOMÁS', 'JUZGADO MIXTO EN ADICIÓN DE FUNCIONES JIP DE CHUMBIVILCAS'),
    ('SANTO TOMÁS', 'JUZGADO DE FAMILIA DE CHUMBIVILCAS'),
    ('SANTO TOMÁS', 'JUZGADO DE PAZ LETRADO DE CHUMBIVILCAS'),
    ('SANTO TOMÁS', 'JUZGADO PENAL UNIPERSONAL DE CHUMBIVILCAS'),

    -- LIVITACA
    ('LIVITACA', 'JUZGADO DE PAZ LETRADO DE LIVITACA'),

    -- CUSCO / CUSCO
    ('CUSCO / CUSCO', 'SALA CIVIL DE CUSCO'),
    ('CUSCO / CUSCO', '1° SALA LABORAL DE CUSCO'),
    ('CUSCO / CUSCO', '2° SALA LABORAL DE CUSCO'),
    ('CUSCO / CUSCO', '1° SALA PENAL DE APELACIONES DE CUSCO'),
    ('CUSCO / CUSCO', '2° SALA PENAL DE APELACIONES DE CUSCO'),
    ('CUSCO / CUSCO', 'SALA PENAL DE APELACIONES TRANSITORIO DE CUSCO'),
    ('CUSCO / CUSCO', '1° JUZGADO CIVIL DE CUSCO'),
    ('CUSCO / CUSCO', '2° JUZGADO CIVIL DE CUSCO'),
    ('CUSCO / CUSCO', '3° JUZGADO CIVIL DE CUSCO'),
    ('CUSCO / CUSCO', '4° JUZGADO CIVIL DE CUSCO'),
    ('CUSCO / CUSCO', '5° JUZGADO CIVIL DE CUSCO'),
    ('CUSCO / CUSCO', '6° JUZGADO CIVIL DE CUSCO'),
    ('CUSCO / CUSCO', 'JUZGADO PENAL COLEGIADO SUPRAPROVINCIAL DE CUSCO A'),
    ('CUSCO / CUSCO', 'JUZGADO PENAL COLEGIADO SUPRAPROVINCIAL DE CUSCO B'),
    ('CUSCO / CUSCO', '1° JUZGADO PENAL UNIPERSONAL DE CUSCO'),
    ('CUSCO / CUSCO', '2° JUZGADO PENAL UNIPERSONAL DE CUSCO'),
    ('CUSCO / CUSCO', '3° JUZGADO PENAL UNIPERSONAL DE CUSCO'),
    ('CUSCO / CUSCO', '5° JUZGADO PENAL UNIPERSONAL DE CUSCO'),
    ('CUSCO / CUSCO', '1° JUZGADO PENAL UNIPERSONAL TRANSITORIO DE CUSCO'),
    ('CUSCO / CUSCO', '1° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO'),
    ('CUSCO / CUSCO', '2° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO'),
    ('CUSCO / CUSCO', '3° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO'),
    ('CUSCO / CUSCO', '4° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO'),
    ('CUSCO / CUSCO', '5° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO'),
    ('CUSCO / CUSCO', '6° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO'),
    ('CUSCO / CUSCO', '7° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO'),

    -- CUSCO / VIOLENCIA FAMILIAR SANCIÓN
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '1° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO ADICI. 1° COLEGIADO CONFORMADO'),
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '2° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO 1° COLEGIADO CONFORMADO'),
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '3° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO 1° COLEGIADO CONFORMADO'),
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '4° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO 2° COLEGIADO CONFORMADO'),
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '1° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO'),
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO'),
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '3° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO'),
    ('CUSCO / VIOLENCIA FAMILIAR SANCIÓN', '1° JUZGADO PENAL COLEGIADO TRANSITORIO - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO'),

    -- CUSCO / FAMILIA NO VIOLENCIA
    ('CUSCO/ FAMILIA NO VIOLENCIA', '1° JUZGADO DE FAMILIA DE CUSCO'),
    ('CUSCO/ FAMILIA NO VIOLENCIA', '2° JUZGADO DE FAMILIA DE CUSCO'),
    ('CUSCO/ FAMILIA NO VIOLENCIA', '3° JUZGADO DE FAMILIA DE CUSCO'),
    ('CUSCO/ FAMILIA NO VIOLENCIA', 'JUZGADO DE FAMILIA TRANSITORIO DE CUSCO'),

    -- CUSCO / FAMILIA VIOLENCIA
    ('CUSCO/ FAMILIA VIOLENCIA', '8° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR'),
    ('CUSCO/ FAMILIA VIOLENCIA', '9° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR'),
    ('CUSCO/ FAMILIA VIOLENCIA', '10° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR'),
    ('CUSCO/ FAMILIA VIOLENCIA', '11° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR'),

    -- CUSCO / EXTINCIÓN - CORRUPCIÓN
    ('CUSCO/EXTINCIÓN - CORRUPCIÓN', '8° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO - ESPECIALIZADO EN CORRUPCIÓN DE FUNCIONARIOS'),
    ('CUSCO/EXTINCIÓN - CORRUPCIÓN', 'JUZGADO PENAL UNIPERSONAL DE DESCARGA - CORRUPCIÓN DE FUNCIONARIOS'),
    ('CUSCO/EXTINCIÓN - CORRUPCIÓN', '4° JUZGADO PENAL UNIPERSONAL DE CUSCO - ESPECIALIZADO EN CORRUPCIÓN DE FUNCIONARIOS'),
    ('CUSCO/EXTINCIÓN - CORRUPCIÓN', 'JUZGADO TRANSITORIO ESPECIALIZADO EN EXTINCIÓN DE DOMINIO DE CUSCO ADICIÓN DE FUNCIONES JIP CORRUPCIÓN, PENAL LIQUIDADOR'),

    -- CUSCO / CONFRATERNIDAD
    ('CUSCO/CONFRATERNIDAD', '1° JUZGADO DE TRABAJO DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '2° JUZGADO DE TRABAJO DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '3° JUZGADO DE TRABAJO DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '4° JUZGADO DE TRABAJO DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '5° JUZGADO DE TRABAJO DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '6° JUZGADO DE TRABAJO DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '1° JUZGADO DE PAZ LETRADO LABORAL DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '2° JUZGADO DE PAZ LETRADO LABORAL DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '1° JUZGADO DE PAZ LETRADO CIVIL DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '2° JUZGADO DE PAZ LETRADO DE FAMILIA DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', '3° JUZGADO DE PAZ LETRADO CIVIL DE CUSCO'),
    ('CUSCO/CONFRATERNIDAD', 'JUZGADO CIVIL DE WANCHAQ'),
    ('CUSCO/CONFRATERNIDAD', '1° JUZGADO DE PAZ LETRADO DE WANCHAQ'),
    ('CUSCO/CONFRATERNIDAD', '2° JUZGADO DE PAZ LETRADO DE WANCHAQ'),

    -- CUSCO / SHAPY
    ('CUSCO/ SHAPY', '4° JUZGADO DE PAZ LETRADO DE CUSCO'),

    -- CUSCO / SANTIAGO
    ('CUSCO/ SANTIAGO', 'JUZGADO CIVIL DE SANTIAGO ITINERANTE A URUBAMBA'),
    ('CUSCO/ SANTIAGO', '1° JUZGADO DE PAZ LETRADO DE SANTIAGO'),
    ('CUSCO/ SANTIAGO', '2° JUZGADO DE PAZ LETRADO DE SANTIAGO'),

    -- CUSCO / SAN JERONIMO
    ('CUSCO/ SAN JERONIMO', 'JUZGADO DE PAZ LETRADO DE SAN JERÓNIMO'),

    -- CUSCO / SAN SEBASTIAN
    ('CUSCO/ SAN SEBASTIAN', '1° JUZGADO DE PAZ LETRADO DE SAN SEBASTIÁN'),
    ('CUSCO/ SAN SEBASTIAN', '2° JUZGADO DE PAZ LETRADO DE SAN SEBASTIÁN'),

    -- ESPINAR
    ('ESPINAR', 'JUZGADO CIVIL DE ESPINAR'),
    ('ESPINAR', 'JUZGADO DE FAMILIA DE ESPINAR'),
    ('ESPINAR', 'JUZGADO DE PAZ LETRADO DE ESPINAR'),
    ('ESPINAR', 'JUZGADO PENAL UNIPERSONAL DE ESPINAR'),
    ('ESPINAR', 'JUZGADO DE INVESTIGACIÓN PREPARATORIA - ESPINAR'),

    -- SANTA ANA
    ('SANTA ANA', 'SALA MIXTA DESC. EN ADICIÓN DE FUNCIONES SALA PENAL DE APELACIONES - LA CONVENCIÓN'),
    ('SANTA ANA', 'JUZGADO CIVIL DE LA CONVENCIÓN'),
    ('SANTA ANA', '1° JUZGADO DE FAMILIA DE LA CONVENCIÓN'),
    ('SANTA ANA', '2° JUZGADO DE FAMILIA DE LA CONVENCIÓN - ESPECIALIZADO EN VIOLENCIA FAMILIAR'),
    ('SANTA ANA', 'JUZGADO PENAL UNIPERSONAL DE LA CONVENCIÓN'),
    ('SANTA ANA', '2° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE LA CONVENCIÓN'),
    ('SANTA ANA', 'JUZGADO DE INVESTIGACIÓN PREPARATORIA - LA CONVENCIÓN'),
    ('SANTA ANA', 'JUZGADO DE INVESTIGACIÓN PREPARATORIA TRANSITORIO - LA CONVENCIÓN'),
    ('SANTA ANA', '1ER. JUZGADO DE PAZ LETRADO DE LA CONVENCIÓN'),
    ('SANTA ANA', '2DO. JUZGADO DE PAZ LETRADO DE LA CONVENCIÓN'),

    -- ECHARATE
    ('ECHARATE', 'JUZGADO MIXTO EN ADICIÓN DE FUNCIONES JPU DE ECHARATE'),
    ('ECHARATE', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE ECHARATE'),

    -- VILCABAMBA
    ('VILCABAMBA', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE VILCABAMBA'),

    -- QUELLOUNO
    ('QUELLOUNO', 'JUZGADO DE PAZ LETRADO DE QUELLOUNO'),

    -- PARURO
    ('PARURO', 'JUZGADO MIXTO PENAL LIQ. EN ADICIÓN DE FUNCIONES JPU DE PARURO'),
    ('PARURO', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE PARURO'),

    -- PAUCARTAMBO
    ('PAUCARTAMBO', 'JUZGADO MIXTO PENAL LIQ. EN ADICIÓN DE FUNCIONES JPU DE PAUCARTAMBO'),
    ('PAUCARTAMBO', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE PAUCARTAMBO'),

    -- URCOS
    ('URCOS', 'JUZGADO CIVIL - QUISPICANCHI'),
    ('URCOS', 'JUZGADO DE PAZ LETRADO DE QUISPICANCHI'),
    ('URCOS', 'JUZGADO PENAL UNIPERSONAL LIQ. - QUISPICANCHI ITINERANTE CANAS'),
    ('URCOS', 'JUZGADO UNIPERSONAL TRANSITORIO URCOS - ITINERANTE A CANAS'),
    ('URCOS', 'JUZGADO DE INVESTIGACIÓN PREPARATORIA - QUISPICANCHI'),
    ('URCOS', '2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE QUISPICANCHI'),
    ('URCOS', 'JUZGADO DE FAMILIA ESPECIALIZADO EN VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE URCOS'),

    -- OCONGATE
    ('OCONGATE', 'JUZGADO DE PAZ LETRADO DE OCONGATE'),

    -- CAMANTI
    ('CAMANTI', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE CAMANTI - QUINCEMIL + JPL ITIN. SICUANI'),

    -- URUBAMBA
    ('URUBAMBA', 'JUZGADO CIVIL DE URUBAMBA'),
    ('URUBAMBA', 'JUZGADO DE FAMILIA DE URUBAMBA - ESPECIALIZADO EN VIOLENCIA FAMILIAR'),
    ('URUBAMBA', 'JUZGADO DE PAZ LETRADO DE URUBAMBA'),
    ('URUBAMBA', '2° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE URUBAMBA'),
    ('URUBAMBA', '2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE URUBAMBA'),
    ('URUBAMBA', 'JUZGADO DE INVESTIGACIÓN PREPARATORIA - URUBAMBA'),
    ('URUBAMBA', 'JUZGADO PENAL UNIPERSONAL PENAL LIQUIDADOR DE URUBAMBA'),

    -- MACHUPICCHU
    ('MACHUPICCHU', 'JUZGADO MIXTO PENAL LIQUIDADOR EN ADICIÓN DE FUNCIONES JUP MACHUPICCHU'),
    ('MACHUPICCHU', 'JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE MACHUPICCHU')

) AS datos(sede, area)
INNER JOIN sede s
    ON UPPER(TRIM(s.sede)) = UPPER(TRIM(datos.sede))
WHERE NOT EXISTS (
    SELECT 1
    FROM area a
    WHERE a.id_sede = s.id_sede
      AND UPPER(TRIM(a.area)) = UPPER(TRIM(datos.area))
);

COMMIT;
