--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2026-10-22 12:52:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 255 (class 1255 OID 179268)
-- Name: audit_area_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_area_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_area_insert() OWNER TO postgres;

--
-- TOC entry 256 (class 1255 OID 179270)
-- Name: audit_area_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_area_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_area_update() OWNER TO postgres;

--
-- TOC entry 251 (class 1255 OID 179260)
-- Name: audit_consumible_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_consumible_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_consumible_insert() OWNER TO postgres;

--
-- TOC entry 252 (class 1255 OID 179262)
-- Name: audit_consumible_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_consumible_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_consumible_update() OWNER TO postgres;

--
-- TOC entry 243 (class 1255 OID 179244)
-- Name: audit_marcas_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_marcas_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_marcas_insert() OWNER TO postgres;

--
-- TOC entry 244 (class 1255 OID 179246)
-- Name: audit_marcas_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_marcas_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_marcas_update() OWNER TO postgres;

--
-- TOC entry 257 (class 1255 OID 179272)
-- Name: audit_modelo_consumible_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_modelo_consumible_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_modelo_consumible_insert() OWNER TO postgres;

--
-- TOC entry 258 (class 1255 OID 179274)
-- Name: audit_modelo_consumible_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_modelo_consumible_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_modelo_consumible_update() OWNER TO postgres;

--
-- TOC entry 245 (class 1255 OID 179248)
-- Name: audit_modelo_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_modelo_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_modelo_insert() OWNER TO postgres;

--
-- TOC entry 246 (class 1255 OID 179250)
-- Name: audit_modelo_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_modelo_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_modelo_update() OWNER TO postgres;

--
-- TOC entry 253 (class 1255 OID 179264)
-- Name: audit_sede_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_sede_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_sede_insert() OWNER TO postgres;

--
-- TOC entry 254 (class 1255 OID 179266)
-- Name: audit_sede_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_sede_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_sede_update() OWNER TO postgres;

--
-- TOC entry 247 (class 1255 OID 179252)
-- Name: audit_tipo_consumible_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_tipo_consumible_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_tipo_consumible_insert() OWNER TO postgres;

--
-- TOC entry 248 (class 1255 OID 179254)
-- Name: audit_tipo_consumible_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_tipo_consumible_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_tipo_consumible_update() OWNER TO postgres;

--
-- TOC entry 249 (class 1255 OID 179256)
-- Name: audit_tipo_equipo_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_tipo_equipo_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_tipo_equipo_insert() OWNER TO postgres;

--
-- TOC entry 250 (class 1255 OID 179258)
-- Name: audit_tipo_equipo_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_tipo_equipo_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_tipo_equipo_update() OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 179240)
-- Name: audit_usuarios_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_usuarios_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'I';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_usuarios_insert() OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 179242)
-- Name: audit_usuarios_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.audit_usuarios_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN

    NEW.f_aud := NOW();
    NEW.b_aud := 'U';

    RETURN NEW;

END;
$$;


ALTER FUNCTION public.audit_usuarios_update() OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 179163)
-- Name: generar_codigo_ticket(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generar_codigo_ticket() RETURNS character varying
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.generar_codigo_ticket() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 179089)
-- Name: area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.area (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_area integer NOT NULL,
    created_at timestamp without time zone,
    area character varying(250),
    referencia character varying(150),
    id_sede integer,
    estado boolean
);


ALTER TABLE public.area OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 179088)
-- Name: area_id_area_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.area_id_area_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.area_id_area_seq OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 223
-- Name: area_id_area_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.area_id_area_seq OWNED BY public.area.id_area;


--
-- TOC entry 234 (class 1259 OID 179132)
-- Name: consumible; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consumible (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_consumible integer NOT NULL,
    created_at timestamp without time zone,
    nro_parte character varying(150),
    id_tipo_consumible integer,
    id_marca integer
);


ALTER TABLE public.consumible OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 179131)
-- Name: consumible_id_consumible_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consumible_id_consumible_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consumible_id_consumible_seq OWNER TO postgres;

--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 233
-- Name: consumible_id_consumible_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consumible_id_consumible_seq OWNED BY public.consumible.id_consumible;


--
-- TOC entry 239 (class 1259 OID 179156)
-- Name: correlativo_ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.correlativo_ticket (
    anio integer NOT NULL,
    ultimo_numero integer NOT NULL
);


ALTER TABLE public.correlativo_ticket OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 179096)
-- Name: marca; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marca (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_marca integer NOT NULL,
    created_at timestamp without time zone,
    marca character varying(100),
    estado boolean
);


ALTER TABLE public.marca OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 179095)
-- Name: marca_id_marca_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marca_id_marca_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.marca_id_marca_seq OWNER TO postgres;

--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 225
-- Name: marca_id_marca_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marca_id_marca_seq OWNED BY public.marca.id_marca;


--
-- TOC entry 230 (class 1259 OID 179114)
-- Name: modelo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modelo (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_modelo integer NOT NULL,
    created_at timestamp without time zone,
    modelo character varying(150),
    estado boolean,
    id_marca integer,
    id_tipo_equipo integer
);


ALTER TABLE public.modelo OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 179141)
-- Name: modelo_consumible; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modelo_consumible (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_modelo_consumible integer NOT NULL,
    created_at timestamp without time zone,
    id_modelo integer,
    id_consumible integer
);


ALTER TABLE public.modelo_consumible OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 179140)
-- Name: modelo_consumible_id_modelo_consumible_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modelo_consumible_id_modelo_consumible_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modelo_consumible_id_modelo_consumible_seq OWNER TO postgres;

--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 235
-- Name: modelo_consumible_id_modelo_consumible_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modelo_consumible_id_modelo_consumible_seq OWNED BY public.modelo_consumible.id_modelo_consumible;


--
-- TOC entry 229 (class 1259 OID 179113)
-- Name: modelo_id_modelo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modelo_id_modelo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modelo_id_modelo_seq OWNER TO postgres;

--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 229
-- Name: modelo_id_modelo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modelo_id_modelo_seq OWNED BY public.modelo.id_modelo;


--
-- TOC entry 218 (class 1259 OID 179064)
-- Name: rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_rol integer NOT NULL,
    rol character varying(100)
);


ALTER TABLE public.rol OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 179063)
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_rol_seq OWNER TO postgres;

--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 217
-- Name: rol_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_id_rol_seq OWNED BY public.rol.id_rol;


--
-- TOC entry 222 (class 1259 OID 179082)
-- Name: sede; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sede (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_sede integer NOT NULL,
    created_at timestamp without time zone,
    sede character varying(150),
    direccion character varying(150),
    estado boolean
);


ALTER TABLE public.sede OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 179081)
-- Name: sede_id_sede_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sede_id_sede_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sede_id_sede_seq OWNER TO postgres;

--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 221
-- Name: sede_id_sede_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sede_id_sede_seq OWNED BY public.sede.id_sede;


--
-- TOC entry 238 (class 1259 OID 179148)
-- Name: ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ticket (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_ticket integer NOT NULL,
    created_at timestamp without time zone,
    codigo character varying(16) DEFAULT public.generar_codigo_ticket(),
    id_area integer,
    id_modelo integer,
    ip character varying(50),
    id_tipo_consumible integer,
    id_consumible integer,
    descripcion text,
    id_usuario integer,
    estado_general character varying(1),
    id_usuario_ti integer,
    id_usuario_al integer,
    ti_mensaje text,
    al_mensaje text,
    fecha_ti date,
    fecha_al date,
    estado_ti boolean,
    estado_al boolean
);


ALTER TABLE public.ticket OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 179147)
-- Name: ticket_id_ticket_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ticket_id_ticket_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ticket_id_ticket_seq OWNER TO postgres;

--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 237
-- Name: ticket_id_ticket_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ticket_id_ticket_seq OWNED BY public.ticket.id_ticket;


--
-- TOC entry 232 (class 1259 OID 179123)
-- Name: tipo_consumible; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_consumible (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_tipo_consumible integer NOT NULL,
    created_at timestamp without time zone,
    tipo_consumible character varying(100)
);


ALTER TABLE public.tipo_consumible OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 179122)
-- Name: tipo_consumible_id_tipo_consumible_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_consumible_id_tipo_consumible_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_consumible_id_tipo_consumible_seq OWNER TO postgres;

--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 231
-- Name: tipo_consumible_id_tipo_consumible_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_consumible_id_tipo_consumible_seq OWNED BY public.tipo_consumible.id_tipo_consumible;


--
-- TOC entry 228 (class 1259 OID 179105)
-- Name: tipo_equipo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_equipo (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_tipo_equipo integer NOT NULL,
    created_at timestamp without time zone,
    tipo_equipo character varying(50),
    descripcion character varying(100)
);


ALTER TABLE public.tipo_equipo OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 179104)
-- Name: tipo_equipo_id_tipo_equipo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tipo_equipo_id_tipo_equipo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_equipo_id_tipo_equipo_seq OWNER TO postgres;

--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 227
-- Name: tipo_equipo_id_tipo_equipo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tipo_equipo_id_tipo_equipo_seq OWNED BY public.tipo_equipo.id_tipo_equipo;


--
-- TOC entry 220 (class 1259 OID 179071)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    f_aud timestamp without time zone,
    b_aud character(1),
    c_aud_uid character varying(30),
    c_aud_uidred character varying(30),
    c_aud_pc character varying(30),
    c_aud_ip character varying(15),
    c_aud_mac character varying(17),
    id_usuario integer NOT NULL,
    created_at timestamp without time zone,
    nombre character varying(100),
    ap_materno character varying(100),
    ap_paterno character varying(100),
    correo character varying(150),
    telefono character varying(20),
    username character varying(100),
    password character varying(255),
    id_rol integer,
    estado boolean
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 179070)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- TOC entry 5081 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- TOC entry 4818 (class 2604 OID 179092)
-- Name: area id_area; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area ALTER COLUMN id_area SET DEFAULT nextval('public.area_id_area_seq'::regclass);


--
-- TOC entry 4823 (class 2604 OID 179135)
-- Name: consumible id_consumible; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumible ALTER COLUMN id_consumible SET DEFAULT nextval('public.consumible_id_consumible_seq'::regclass);


--
-- TOC entry 4819 (class 2604 OID 179099)
-- Name: marca id_marca; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marca ALTER COLUMN id_marca SET DEFAULT nextval('public.marca_id_marca_seq'::regclass);


--
-- TOC entry 4821 (class 2604 OID 179117)
-- Name: modelo id_modelo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo ALTER COLUMN id_modelo SET DEFAULT nextval('public.modelo_id_modelo_seq'::regclass);


--
-- TOC entry 4824 (class 2604 OID 179144)
-- Name: modelo_consumible id_modelo_consumible; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo_consumible ALTER COLUMN id_modelo_consumible SET DEFAULT nextval('public.modelo_consumible_id_modelo_consumible_seq'::regclass);


--
-- TOC entry 4815 (class 2604 OID 179067)
-- Name: rol id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);


--
-- TOC entry 4817 (class 2604 OID 179085)
-- Name: sede id_sede; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sede ALTER COLUMN id_sede SET DEFAULT nextval('public.sede_id_sede_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 179151)
-- Name: ticket id_ticket; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket ALTER COLUMN id_ticket SET DEFAULT nextval('public.ticket_id_ticket_seq'::regclass);


--
-- TOC entry 4822 (class 2604 OID 179126)
-- Name: tipo_consumible id_tipo_consumible; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_consumible ALTER COLUMN id_tipo_consumible SET DEFAULT nextval('public.tipo_consumible_id_tipo_consumible_seq'::regclass);


--
-- TOC entry 4820 (class 2604 OID 179108)
-- Name: tipo_equipo id_tipo_equipo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_equipo ALTER COLUMN id_tipo_equipo SET DEFAULT nextval('public.tipo_equipo_id_tipo_equipo_seq'::regclass);


--
-- TOC entry 4816 (class 2604 OID 179074)
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- TOC entry 5050 (class 0 OID 179089)
-- Dependencies: 224
-- Data for Name: area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.area (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_area, created_at, area, referencia, id_sede, estado) FROM stdin;
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	19	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL DE CHUMBIVILCAS	\N	9	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	20	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE URUBAMBA	\N	31	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	21	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE CANAS	\N	6	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	22	2026-10-22 12:41:57.716856	JUZGADO DE INVESTIGACIÓN PREPARATORIA - ESPINAR	\N	21	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	23	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA DE ESPINAR	\N	21	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	24	2026-10-22 12:41:57.716856	2° JUZGADO DE PAZ LETRADO LABORAL DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	25	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE ESPINAR	\N	21	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	26	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE OCONGATE	\N	29	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	27	2026-10-22 12:41:57.716856	1° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO ADICI. 1° COLEGIADO CONFORMADO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	28	2026-10-22 12:41:57.716856	1° JUZGADO DE INVESTIGACIÓN PREPARATORIA - CANCHIS	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	29	2026-10-22 12:41:57.716856	SALA MIXTA DESC. EN ADICIÓN DE FUNCIONES SALA PENAL DE APELACIONES - LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	30	2026-10-22 12:41:57.716856	JUZGADO PENAL COLEGIADO SUPRAPROVINCIAL DE CUSCO A	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	31	2026-10-22 12:41:57.716856	2DO. JUZGADO CIVIL DE CANCHIS	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	32	2026-10-22 12:41:57.716856	1° JUZGADO DE TRABAJO DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	33	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA ESPECIALIZADO EN VIOLENCIA DE CALCA	\N	4	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	34	2026-10-22 12:41:57.716856	1° JUZGADO DE PAZ LETRADO DE SAN SEBASTIÁN	\N	20	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	35	2026-10-22 12:41:57.716856	3° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO 1° COLEGIADO CONFORMADO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	36	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL DE ANTA	\N	3	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	37	2026-10-22 12:41:57.716856	JUZGADO CIVIL DE ESPINAR	\N	21	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	38	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA ESPECIALIZADO EN VIOLENCIA DE SICUANI	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	39	2026-10-22 12:41:57.716856	2° SALA PENAL DE APELACIONES DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	40	2026-10-22 12:41:57.716856	2° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO 1° COLEGIADO CONFORMADO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	41	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE VILCABAMBA	\N	24	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	42	2026-10-22 12:41:57.716856	2° JUZGADO DE PAZ LETRADO DE WANCHAQ	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	43	2026-10-22 12:41:57.716856	JUZGADO CIVIL DE CALCA	\N	4	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	44	2026-10-22 12:41:57.716856	1° JUZGADO DE PAZ LETRADO LABORAL DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	45	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL DE ESPINAR	\N	21	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	46	2026-10-22 12:41:57.716856	JUZGADO TRANSITORIO ESPECIALIZADO EN EXTINCIÓN DE DOMINIO DE CUSCO ADICIÓN DE FUNCIONES JIP CORRUPCIÓN, PENAL LIQUIDADOR	\N	15	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	47	2026-10-22 12:41:57.716856	1° JUZGADO DE FAMILIA DE LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	48	2026-10-22 12:41:57.716856	4° JUZGADO PENAL UNIPERSONAL DE CUSCO - ESPECIALIZADO EN CORRUPCIÓN DE FUNCIONARIOS	\N	15	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	49	2026-10-22 12:41:57.716856	2° JUZGADO PENAL UNIPERSONAL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	50	2026-10-22 12:41:57.716856	2° JUZGADO DE PAZ LETRADO DE SANTIAGO	\N	18	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	51	2026-10-22 12:41:57.716856	JUZGADO DE INVESTIGACIÓN PREPARATORIA - ANTA	\N	3	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	52	2026-10-22 12:41:57.716856	2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE QUISPICANCHI	\N	28	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	53	2026-10-22 12:41:57.716856	1° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	54	2026-10-22 12:41:57.716856	3° JUZGADO DE FAMILIA DE CUSCO	\N	13	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	55	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE SAN JERÓNIMO	\N	19	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	56	2026-10-22 12:41:57.716856	1° JUZGADO PENAL UNIPERSONAL TRANSITORIO DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	110	2026-10-22 12:41:57.716856	SALA CIVIL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	57	2026-10-22 12:41:57.716856	JUZGADO PENAL COLEGIADO SUPRAPROVINCIAL DE CUSCO B	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	58	2026-10-22 12:41:57.716856	10° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR	\N	14	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	59	2026-10-22 12:41:57.716856	JUZGADO CIVIL DE LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	60	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE PAUCARTAMBO	\N	27	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	61	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA DE ANTA	\N	3	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	62	2026-10-22 12:41:57.716856	4° JUZGADO DE TRABAJO DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	63	2026-10-22 12:41:57.716856	1° JUZGADO DE PAZ LETRADO CIVIL DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	64	2026-10-22 12:41:57.716856	6° JUZGADO DE TRABAJO DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	65	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE PARURO	\N	26	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	66	2026-10-22 12:41:57.716856	JUZGADO DE INVESTIGACIÓN PREPARATORIA TRANSITORIO - LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	67	2026-10-22 12:41:57.716856	JUZGADO MIXTO PENAL LIQ. EN ADICIÓN DE FUNCIONES JIP DE CANAS	\N	6	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	68	2026-10-22 12:41:57.716856	3° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	69	2026-10-22 12:41:57.716856	7° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	70	2026-10-22 12:41:57.716856	1° JUZGADO DE PAZ LETRADO DE WANCHAQ	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	71	2026-10-22 12:41:57.716856	1° JUZGADO PENAL COLEGIADO TRANSITORIO - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	72	2026-10-22 12:41:57.716856	JUZGADO CIVIL DE SANTIAGO ITINERANTE A URUBAMBA	\N	18	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	73	2026-10-22 12:41:57.716856	4° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO 2° COLEGIADO CONFORMADO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	74	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE ECHARATE	\N	23	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	75	2026-10-22 12:41:57.716856	1° JUZGADO PENAL UNIPERSONAL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	76	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL DE LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	77	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL LIQ. - QUISPICANCHI ITINERANTE CANAS	\N	28	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	78	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE CANCHIS	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	79	2026-10-22 12:41:57.716856	2° JUZGADO DE FAMILIA DE CUSCO	\N	13	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	80	2026-10-22 12:41:57.716856	1° JUZGADO DE FAMILIA DE CUSCO	\N	13	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	81	2026-10-22 12:41:57.716856	2° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	82	2026-10-22 12:41:57.716856	JUZGADO MIXTO EN ADICIÓN DE FUNCIONES JPU DE ECHARATE	\N	23	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	83	2026-10-22 12:41:57.716856	3° JUZGADO CIVIL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	84	2026-10-22 12:41:57.716856	JUZGADO DE INVESTIGACIÓN PREPARATORIA - LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	85	2026-10-22 12:41:57.716856	5° JUZGADO DE TRABAJO DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	86	2026-10-22 12:41:57.716856	SALA MIXTA DESC. EN ADICIÓN DE FUNCIONES SALA PENAL DE APELACIONES - CANCHIS	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	87	2026-10-22 12:41:57.716856	1ER. JUZGADO DE PAZ LETRADO DE LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	88	2026-10-22 12:41:57.716856	JUZGADO CIVIL DE URUBAMBA	\N	31	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	89	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA DE CHUMBIVILCAS	\N	9	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	90	2026-10-22 12:41:57.716856	11° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR	\N	14	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	91	2026-10-22 12:41:57.716856	JUZGADO UNIPERSONAL TRANSITORIO URCOS - ITINERANTE A CANAS	\N	28	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	92	2026-10-22 12:41:57.716856	JUZGADO MIXTO PENAL LIQ. EN ADICIÓN DE FUNCIONES JPU DE PARURO	\N	26	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	93	2026-10-22 12:41:57.716856	6° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	94	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA ESPECIALIZADO EN VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE URCOS	\N	28	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	95	2026-10-22 12:41:57.716856	2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	96	2026-10-22 12:41:57.716856	2DO. JUZGADO DE PAZ LETRADO DE LA CONVENCIÓN	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	97	2026-10-22 12:41:57.716856	9° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR	\N	14	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	98	2026-10-22 12:41:57.716856	1ER. JUZGADO CIVIL DE CANCHIS	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	99	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE ACOMAYO	\N	1	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	100	2026-10-22 12:41:57.716856	2° JUZGADO DE TRABAJO DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	101	2026-10-22 12:41:57.716856	4° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	102	2026-10-22 12:41:57.716856	3° JUZGADO PENAL UNIPERSONAL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	103	2026-10-22 12:41:57.716856	2° JUZGADO PENAL UNIPERSONAL - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE URUBAMBA	\N	31	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	104	2026-10-22 12:41:57.716856	2° JUZGADO CIVIL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	105	2026-10-22 12:41:57.716856	JUZGADO CIVIL - QUISPICANCHI	\N	28	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	106	2026-10-22 12:41:57.716856	2° SALA LABORAL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	107	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE LIVITACA	\N	10	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	108	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE ANTA	\N	3	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	109	2026-10-22 12:41:57.716856	2° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	111	2026-10-22 12:41:57.716856	2° JUZGADO DE PAZ LETRADO DE FAMILIA DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	112	2026-10-22 12:41:57.716856	2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE URUBAMBA	\N	31	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	113	2026-10-22 12:41:57.716856	3° JUZGADO DE TRABAJO DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	114	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL EN ADICIÓN DE FUNCIONES PENAL LIQ DE CALCA	\N	4	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	115	2026-10-22 12:41:57.716856	JUZGADO CIVIL DE WANCHAQ	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	116	2026-10-22 12:41:57.716856	8° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO - ESPECIALIZADO EN CORRUPCIÓN DE FUNCIONARIOS	\N	15	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	117	2026-10-22 12:41:57.716856	JUZGADO MIXTO PENAL LIQ. EN ADICIÓN DE FUNCIONES JPU DE PAUCARTAMBO	\N	27	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	118	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE CHUMBIVILCAS	\N	9	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	119	2026-10-22 12:41:57.716856	1° SALA PENAL DE APELACIONES DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	120	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE CAMANTI - QUINCEMIL + JPL ITIN. SICUANI	\N	30	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	121	2026-10-22 12:41:57.716856	1° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	122	2026-10-22 12:41:57.716856	4° JUZGADO DE PAZ LETRADO DE CUSCO	\N	17	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	123	2026-10-22 12:41:57.716856	2° JUZGADO DE PAZ LETRADO DE SAN SEBASTIÁN	\N	20	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	124	2026-10-22 12:41:57.716856	4° JUZGADO CIVIL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	125	2026-10-22 12:41:57.716856	2° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CANCHIS	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	126	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA TRANSITORIO DE CUSCO	\N	13	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	127	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE QUELLOUNO	\N	25	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	128	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE YANATILE	\N	5	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	129	2026-10-22 12:41:57.716856	JUZGADO CIVIL DE ANTA	\N	3	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	130	2026-10-22 12:41:57.716856	3° JUZGADO DE PAZ LETRADO CIVIL DE CUSCO	\N	16	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	131	2026-10-22 12:41:57.716856	JUZGADO DE INVESTIGACIÓN PREPARATORIA - URUBAMBA	\N	31	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	132	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE CALCA	\N	4	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	133	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL DE DESCARGA - CORRUPCIÓN DE FUNCIONARIOS	\N	15	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	134	2026-10-22 12:41:57.716856	1° JUZGADO CIVIL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	135	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA DE URUBAMBA - ESPECIALIZADO EN VIOLENCIA FAMILIAR	\N	31	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	136	2026-10-22 12:41:57.716856	5° JUZGADO PENAL UNIPERSONAL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	137	2026-10-22 12:41:57.716856	JUZGADO MIXTO EN ADICIÓN DE FUNCIONES JIP DE CHUMBIVILCAS	\N	9	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	138	2026-10-22 12:41:57.716856	SALA PENAL DE APELACIONES TRANSITORIO DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	139	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE POMACANCHI	\N	2	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	140	2026-10-22 12:41:57.716856	6° JUZGADO CIVIL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	141	2026-10-22 12:41:57.716856	JUZGADO DE FAMILIA DE SICUANI	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	142	2026-10-22 12:41:57.716856	JUZGADO DE INVESTIGACIÓN PREPARATORIA - CALCA	\N	4	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	143	2026-10-22 12:41:57.716856	JUZGADO MIXTO PENAL LIQUIDADOR EN ADICIÓN DE FUNCIONES JUP DE ACOMAYO	\N	1	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	144	2026-10-22 12:41:57.716856	JUZGADO MIXTO PENAL LIQUIDADOR EN ADICIÓN DE FUNCIONES JUP MACHUPICCHU	\N	32	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	145	2026-10-22 12:41:57.716856	8° JUZGADO DE FAMILIA DE CUSCO, ESPECIALIZADO EN VIOLENCIA FAMILIAR	\N	14	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	146	2026-10-22 12:41:57.716856	3° JUZGADO DE INVESTIGACIÓN PREPARATORIA - SUB ESPECIALIZADO EN DELITOS ASOCIADOS A LA VIOLENCIA CONTRA LAS MUJERES E INTEGRANTES DEL GRUPO FAMILIAR DE CUSCO	\N	12	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	147	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE TINTA	\N	8	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	148	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO DE QUISPICANCHI	\N	28	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	149	2026-10-22 12:41:57.716856	1° JUZGADO DE PAZ LETRADO DE SANTIAGO	\N	18	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	150	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL PENAL LIQUIDADOR DE URUBAMBA	\N	31	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	151	2026-10-22 12:41:57.716856	JUZGADO PENAL UNIPERSONAL DE CANCHIS	\N	7	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	152	2026-10-22 12:41:57.716856	JUZGADO DE INVESTIGACIÓN PREPARATORIA - QUISPICANCHI	\N	28	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	153	2026-10-22 12:41:57.716856	JUZGADO DE PAZ LETRADO EN ADICIÓN DE FUNCIONES JIP DE MACHUPICCHU	\N	32	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	154	2026-10-22 12:41:57.716856	5° JUZGADO CIVIL DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	155	2026-10-22 12:41:57.716856	5° JUZGADO DE INVESTIGACIÓN PREPARATORIA DE CUSCO	\N	11	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	156	2026-10-22 12:41:57.716856	2° JUZGADO DE FAMILIA DE LA CONVENCIÓN - ESPECIALIZADO EN VIOLENCIA FAMILIAR	\N	22	t
2026-10-22 12:41:57.716856	I	postgres	ADMIN	\N	127.0.0.1	\N	157	2026-10-22 12:41:57.716856	1° SALA LABORAL DE CUSCO	\N	11	t
\.


--
-- TOC entry 5060 (class 0 OID 179132)
-- Dependencies: 234
-- Data for Name: consumible; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consumible (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_consumible, created_at, nro_parte, id_tipo_consumible, id_marca) FROM stdin;
2026-10-21 17:35:28.760393	I	neto	admin	\N	172.17.64.225	\N	1	2026-10-21 17:35:28.717	50F4X00	2	2
2026-10-22 11:58:13.596214	I	neto	admin	\N	172.17.64.225	\N	2	2026-10-22 11:58:13.565	50F0Z00	1	2
2026-10-22 11:58:52.517789	I	neto	admin	\N	172.17.64.225	\N	3	2026-10-22 11:58:52.477	56F4X00	2	2
2026-10-22 11:59:34.944866	I	neto	admin	\N	172.17.64.225	\N	4	2026-10-22 11:59:34.81	56F0Z00	1	2
2026-10-22 12:01:08.190191	I	neto	admin	\N	172.17.64.225	\N	6	2026-10-22 12:01:08.141	50F4U00	2	2
2026-10-22 12:01:40.40425	I	neto	admin	\N	172.17.64.225	\N	7	2026-10-22 12:01:40.354	62D4H00	2	2
2026-10-22 12:01:59.776036	I	neto	admin	\N	172.17.64.225	\N	8	2026-10-22 12:01:59.736	52D0Z00	1	2
2026-10-22 12:02:38.027931	I	neto	admin	\N	172.17.64.225	\N	10	2026-10-22 12:02:37.972	52D4H00	2	2
2026-10-22 12:02:57.40688	I	neto	admin	\N	172.17.64.225	\N	11	2026-10-22 12:02:57.367	58D4U00	2	2
2026-10-22 12:03:15.116217	I	neto	admin	\N	172.17.64.225	\N	12	2026-10-22 12:03:15.038	58D0Z00	1	2
2026-10-22 12:03:39.970325	I	neto	admin	\N	172.17.64.225	\N	13	2026-10-22 12:03:39.926	56F4U00	2	2
\.


--
-- TOC entry 5065 (class 0 OID 179156)
-- Dependencies: 239
-- Data for Name: correlativo_ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.correlativo_ticket (anio, ultimo_numero) FROM stdin;
\.


--
-- TOC entry 5052 (class 0 OID 179096)
-- Dependencies: 226
-- Data for Name: marca; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.marca (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_marca, created_at, marca, estado) FROM stdin;
2026-10-21 16:55:52.217179	I	neto	admin	\N	172.17.64.225	\N	1	2026-10-21 16:55:52.152	HP	t
2026-10-21 16:56:08.474976	I	neto	admin	\N	172.17.64.225	\N	2	2026-10-21 16:56:08.435	LEXMARK	t
\.


--
-- TOC entry 5056 (class 0 OID 179114)
-- Dependencies: 230
-- Data for Name: modelo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modelo (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_modelo, created_at, modelo, estado, id_marca, id_tipo_equipo) FROM stdin;
2026-10-21 17:01:59.540733	I	neto	admin	\N	172.17.64.225	\N	1	2026-10-21 17:01:59.486	MS415	t	2	1
2026-10-21 17:02:16.886274	I	neto	admin	\N	172.17.64.225	\N	2	2026-10-21 17:02:16.86	MS421	t	2	1
2026-10-21 17:07:27.080911	I	neto	admin	\N	172.17.64.225	\N	3	2026-10-21 17:07:27.055	MS610	t	2	1
2026-10-21 17:09:38.486636	I	neto	admin	\N	172.17.64.225	\N	4	2026-10-21 17:09:38.457	MS710	t	2	1
2026-10-21 17:09:55.583916	I	neto	admin	\N	172.17.64.225	\N	5	2026-10-21 17:09:55.538	MX710	t	2	2
2026-10-21 17:10:55.240476	I	neto	admin	\N	172.17.64.225	\N	6	2026-10-21 17:10:55.208	MS810	t	2	1
2026-10-21 17:11:45.78516	I	neto	admin	\N	172.17.64.225	\N	7	2026-10-21 17:11:45.741	MX722	t	2	2
2026-10-21 17:12:16.022319	I	neto	admin	\N	172.17.64.225	\N	8	2026-10-21 17:12:16.02	MS622	t	2	1
2026-10-21 17:14:01.962988	I	neto	admin	\N	172.17.64.225	\N	9	2026-10-21 17:14:01.925	MX622	t	2	2
2026-10-22 12:12:37.564726	U	neto	admin	\N	172.17.64.225	\N	10	2026-10-22 12:11:55.246	BORRAR	t	1	2
2026-10-22 12:12:53.738445	I	neto	admin	\N	172.17.64.225	\N	11	2026-10-22 12:12:53.692	MX826	t	2	2
\.


--
-- TOC entry 5062 (class 0 OID 179141)
-- Dependencies: 236
-- Data for Name: modelo_consumible; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modelo_consumible (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_modelo_consumible, created_at, id_modelo, id_consumible) FROM stdin;
2026-10-22 09:27:56.644856	I	neto	admin	\N	172.17.64.225	\N	1	2026-10-22 09:27:56.61	1	1
2026-10-22 12:04:26.733866	I	neto	admin	\N	172.17.64.225	\N	2	2026-10-22 12:04:26.679	1	2
2026-10-22 12:04:52.369986	I	neto	admin	\N	172.17.64.225	\N	3	2026-10-22 12:04:52.326	2	3
2026-10-22 12:05:27.370189	I	neto	admin	\N	172.17.64.225	\N	4	2026-10-22 12:05:27.347	2	4
2026-10-22 12:05:54.549074	I	neto	admin	\N	172.17.64.225	\N	5	2026-10-22 12:05:54.499	3	6
2026-10-22 12:06:12.071587	I	neto	admin	\N	172.17.64.225	\N	6	2026-10-22 12:06:12.027	3	2
2026-10-22 12:06:43.342796	I	neto	admin	\N	172.17.64.225	\N	7	2026-10-22 12:06:43.307	5	7
2026-10-22 12:06:58.147687	I	neto	admin	\N	172.17.64.225	\N	8	2026-10-22 12:06:58.121	5	8
2026-10-22 12:07:44.010565	I	neto	admin	\N	172.17.64.225	\N	9	2026-10-22 12:07:43.985	4	7
2026-10-22 12:08:10.731723	I	neto	admin	\N	172.17.64.225	\N	10	2026-10-22 12:08:10.697	4	8
2026-10-22 12:08:40.737521	I	neto	admin	\N	172.17.64.225	\N	11	2026-10-22 12:08:40.592	6	10
2026-10-22 12:08:53.284396	I	neto	admin	\N	172.17.64.225	\N	12	2026-10-22 12:08:53.245	6	8
2026-10-22 12:09:27.208937	I	neto	admin	\N	172.17.64.225	\N	13	2026-10-22 12:09:27.181	7	11
2026-10-22 12:09:41.954766	I	neto	admin	\N	172.17.64.225	\N	14	2026-10-22 12:09:41.917	7	12
2026-10-22 12:10:11.7745	I	neto	admin	\N	172.17.64.225	\N	15	2026-10-22 12:10:11.726	8	13
2026-10-22 12:10:20.94456	I	neto	admin	\N	172.17.64.225	\N	16	2026-10-22 12:10:20.943	8	4
2026-10-22 12:10:49.076131	I	neto	admin	\N	172.17.64.225	\N	17	2026-10-22 12:10:48.934	9	13
2026-10-22 12:11:01.000482	I	neto	admin	\N	172.17.64.225	\N	18	2026-10-22 12:11:00.965	9	4
2026-10-22 12:13:10.596247	I	neto	admin	\N	172.17.64.225	\N	19	2026-10-22 12:13:10.554	11	11
2026-10-22 12:13:31.068083	I	neto	admin	\N	172.17.64.225	\N	20	2026-10-22 12:13:31.035	11	12
\.


--
-- TOC entry 5044 (class 0 OID 179064)
-- Dependencies: 218
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_rol, rol) FROM stdin;
2026-09-30 14:54:19.321023	I	admin	admin	PC-ADMIN	127.0.0.1	00:00:00:00:00:00	1	ADMINISTRADOR
2026-09-30 14:54:19.321023	I	admin	admin	PC-ADMIN	127.0.0.1	00:00:00:00:00:00	2	INFORMATICA
2026-09-30 14:54:19.321023	I	admin	admin	PC-ADMIN	127.0.0.1	00:00:00:00:00:00	3	ALMACEN
2026-09-30 14:54:19.321023	I	admin	admin	PC-ADMIN	127.0.0.1	00:00:00:00:00:00	4	SOLICITANTE
\.


--
-- TOC entry 5048 (class 0 OID 179082)
-- Dependencies: 222
-- Data for Name: sede; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sede (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_sede, created_at, sede, direccion, estado) FROM stdin;
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	1	2026-10-22 12:33:38.113802	ACOMAYO	JR. BOLOGNESI S/N - ACOMAYO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	2	2026-10-22 12:33:38.113802	POMACANCHI	PLAZA DE ARMAS S/N - CENTRO CÍVICO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	3	2026-10-22 12:33:38.113802	ANTA	PLAZA CÍVICA S/N - ANTA	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	4	2026-10-22 12:33:38.113802	CALCA	CALLE TÚPAC AMARU - URBANIZACIÓN CALCA	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	5	2026-10-22 12:33:38.113802	LA QUEBRADA	AV. CALCA S/N ESQUINA CON JR. LARES	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	6	2026-10-22 12:33:38.113802	YANAOCA	CENTRO CÍVICO S/N - PLAZA DE ARMAS	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	7	2026-10-22 12:33:38.113802	SICUANI / CANCHIS	AV. SAN MARTÍN - SICUANI	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	8	2026-10-22 12:33:38.113802	TINTA / CANCHIS	AV. CENTENARIO S/N - TINTA	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	9	2026-10-22 12:33:38.113802	SANTO TOMÁS	28 DE JULIO LOTE 35 MANZANA C-3	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	10	2026-10-22 12:33:38.113802	LIVITACA	CALLE CONCEPCIÓN - LOCAL DEL ALBERGUE MUNICIPAL	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	11	2026-10-22 12:33:38.113802	CUSCO / CUSCO	AV. EL SOL 239 - CUSCO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	12	2026-10-22 12:33:38.113802	CUSCO / VIOLENCIA FAMILIAR SANCIÓN	VILLA HUANCARO - CUSCO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	13	2026-10-22 12:33:38.113802	CUSCO/ FAMILIA NO VIOLENCIA	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	14	2026-10-22 12:33:38.113802	CUSCO/ FAMILIA VIOLENCIA	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	15	2026-10-22 12:33:38.113802	CUSCO/EXTINCIÓN - CORRUPCIÓN	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	16	2026-10-22 12:33:38.113802	CUSCO/CONFRATERNIDAD	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	17	2026-10-22 12:33:38.113802	CUSCO/ SHAPY	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	18	2026-10-22 12:33:38.113802	CUSCO/ SANTIAGO	AV. AGUSTÍN GAMARRA 160 - CUSCO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	19	2026-10-22 12:33:38.113802	CUSCO/ SAN JERONIMO	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	20	2026-10-22 12:33:38.113802	CUSCO/ SAN SEBASTIAN	AV. DE LA CULTURA - CUSCO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	21	2026-10-22 12:33:38.113802	ESPINAR	JR. ALFONSO UGARTE N.° 312, MZ. R, LT. 17, SUB LT. A - ESPINAR	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	22	2026-10-22 12:33:38.113802	SANTA ANA	JR. ESPINAR N.° 148 Y 150 - SANTA ANA, LA CONVENCIÓN	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	23	2026-10-22 12:33:38.113802	ECHARATE	CRUCE JR. MARIÁTEGUI CON JR. KAMISEA - ECHARATE	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	24	2026-10-22 12:33:38.113802	VILCABAMBA	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	25	2026-10-22 12:33:38.113802	QUELLOUNO	\N	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	26	2026-10-22 12:33:38.113802	PARURO	AV. GRAU MZ. F-1 LOTE 12 - PARURO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	27	2026-10-22 12:33:38.113802	PAUCARTAMBO	CALLE COLÓN S/N - PAUCARTAMBO	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	28	2026-10-22 12:33:38.113802	URCOS	CASA DE LA JUVENTUD, JR. MARIANO MELGAR S/N - URCOS	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	29	2026-10-22 12:33:38.113802	OCONGATE	CALLE LAGUNILLAS S/N - OCONGATE	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	30	2026-10-22 12:33:38.113802	CAMANTI	PLAZA DE ARMAS - QUINCE MIL	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	31	2026-10-22 12:33:38.113802	URUBAMBA	JR. COMERCIO S/N - URUBAMBA	t
2026-10-22 12:33:38.113802	I	postgres	ADMIN	\N	127.0.0.1	\N	32	2026-10-22 12:33:38.113802	MACHUPICCHU	COMPLEJO CULTURAL, INTERIOR PISO 3 - MACHUPICCHU	t
\.


--
-- TOC entry 5064 (class 0 OID 179148)
-- Dependencies: 238
-- Data for Name: ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ticket (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_ticket, created_at, codigo, id_area, id_modelo, ip, id_tipo_consumible, id_consumible, descripcion, id_usuario, estado_general, id_usuario_ti, id_usuario_al, ti_mensaje, al_mensaje, fecha_ti, fecha_al, estado_ti, estado_al) FROM stdin;
\.


--
-- TOC entry 5058 (class 0 OID 179123)
-- Dependencies: 232
-- Data for Name: tipo_consumible; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_consumible (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_tipo_consumible, created_at, tipo_consumible) FROM stdin;
2026-10-21 17:19:02.874162	U	neto	admin	\N	172.17.64.225	\N	1	2026-10-21 17:18:12.339	Unidad de imagen
2026-10-21 17:19:16.032786	I	neto	admin	\N	172.17.64.225	\N	2	2026-10-21 17:19:16.001	Cartucho de toner
\.


--
-- TOC entry 5054 (class 0 OID 179105)
-- Dependencies: 228
-- Data for Name: tipo_equipo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_equipo (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_tipo_equipo, created_at, tipo_equipo, descripcion) FROM stdin;
2026-10-21 17:00:38.111235	I	neto	\N	\N	172.17.64.225	\N	1	2026-10-21 17:00:38.067	Monofuncion	Solo impresion
2026-10-21 17:01:18.287509	I	neto	\N	\N	172.17.64.225	\N	2	2026-10-21 17:01:18.118	Multifuncion	Impresion, copias y scanner
\.


--
-- TOC entry 5046 (class 0 OID 179071)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (f_aud, b_aud, c_aud_uid, c_aud_uidred, c_aud_pc, c_aud_ip, c_aud_mac, id_usuario, created_at, nombre, ap_materno, ap_paterno, correo, telefono, username, password, id_rol, estado) FROM stdin;
2026-09-30 14:54:19.321023	I	admin	admin	PC-ADMIN	127.0.0.1	00:00:00:00:00:00	1	2026-09-30 14:54:19.321023	Administrador			admin@admin.com		admin	$2b$10$qkxKBT7txTI1vf9TTJLatuH1MuWTE9W6/qAt66uw6nfJOrHVc74g.	1	t
\.


--
-- TOC entry 5082 (class 0 OID 0)
-- Dependencies: 223
-- Name: area_id_area_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.area_id_area_seq', 157, true);


--
-- TOC entry 5083 (class 0 OID 0)
-- Dependencies: 233
-- Name: consumible_id_consumible_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consumible_id_consumible_seq', 15, true);


--
-- TOC entry 5084 (class 0 OID 0)
-- Dependencies: 225
-- Name: marca_id_marca_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marca_id_marca_seq', 2, true);


--
-- TOC entry 5085 (class 0 OID 0)
-- Dependencies: 235
-- Name: modelo_consumible_id_modelo_consumible_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modelo_consumible_id_modelo_consumible_seq', 20, true);


--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 229
-- Name: modelo_id_modelo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modelo_id_modelo_seq', 11, true);


--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 217
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_id_rol_seq', 1, false);


--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 221
-- Name: sede_id_sede_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sede_id_sede_seq', 32, true);


--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 237
-- Name: ticket_id_ticket_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ticket_id_ticket_seq', 1, false);


--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 231
-- Name: tipo_consumible_id_tipo_consumible_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_consumible_id_tipo_consumible_seq', 2, true);


--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 227
-- Name: tipo_equipo_id_tipo_equipo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tipo_equipo_id_tipo_equipo_seq', 2, true);


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, true);


--
-- TOC entry 4836 (class 2606 OID 179094)
-- Name: area area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area
    ADD CONSTRAINT area_pkey PRIMARY KEY (id_area);


--
-- TOC entry 4854 (class 2606 OID 179139)
-- Name: consumible consumible_nro_parte_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumible
    ADD CONSTRAINT consumible_nro_parte_key UNIQUE (nro_parte);


--
-- TOC entry 4856 (class 2606 OID 179137)
-- Name: consumible consumible_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumible
    ADD CONSTRAINT consumible_pkey PRIMARY KEY (id_consumible);


--
-- TOC entry 4864 (class 2606 OID 179160)
-- Name: correlativo_ticket correlativo_ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.correlativo_ticket
    ADD CONSTRAINT correlativo_ticket_pkey PRIMARY KEY (anio);


--
-- TOC entry 4838 (class 2606 OID 179103)
-- Name: marca marca_marca_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_marca_key UNIQUE (marca);


--
-- TOC entry 4840 (class 2606 OID 179101)
-- Name: marca marca_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marca
    ADD CONSTRAINT marca_pkey PRIMARY KEY (id_marca);


--
-- TOC entry 4858 (class 2606 OID 179146)
-- Name: modelo_consumible modelo_consumible_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo_consumible
    ADD CONSTRAINT modelo_consumible_pkey PRIMARY KEY (id_modelo_consumible);


--
-- TOC entry 4846 (class 2606 OID 179121)
-- Name: modelo modelo_modelo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_modelo_key UNIQUE (modelo);


--
-- TOC entry 4848 (class 2606 OID 179119)
-- Name: modelo modelo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT modelo_pkey PRIMARY KEY (id_modelo);


--
-- TOC entry 4828 (class 2606 OID 179069)
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 4834 (class 2606 OID 179087)
-- Name: sede sede_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sede
    ADD CONSTRAINT sede_pkey PRIMARY KEY (id_sede);


--
-- TOC entry 4860 (class 2606 OID 179155)
-- Name: ticket ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id_ticket);


--
-- TOC entry 4850 (class 2606 OID 179128)
-- Name: tipo_consumible tipo_consumible_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_consumible
    ADD CONSTRAINT tipo_consumible_pkey PRIMARY KEY (id_tipo_consumible);


--
-- TOC entry 4852 (class 2606 OID 179130)
-- Name: tipo_consumible tipo_consumible_tipo_consumible_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_consumible
    ADD CONSTRAINT tipo_consumible_tipo_consumible_key UNIQUE (tipo_consumible);


--
-- TOC entry 4842 (class 2606 OID 179110)
-- Name: tipo_equipo tipo_equipo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_equipo
    ADD CONSTRAINT tipo_equipo_pkey PRIMARY KEY (id_tipo_equipo);


--
-- TOC entry 4844 (class 2606 OID 179112)
-- Name: tipo_equipo tipo_equipo_tipo_equipo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_equipo
    ADD CONSTRAINT tipo_equipo_tipo_equipo_key UNIQUE (tipo_equipo);


--
-- TOC entry 4862 (class 2606 OID 179162)
-- Name: ticket uq_ticket_codigo; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT uq_ticket_codigo UNIQUE (codigo);


--
-- TOC entry 4830 (class 2606 OID 179078)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4832 (class 2606 OID 179080)
-- Name: usuarios usuarios_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_username_key UNIQUE (username);


--
-- TOC entry 4884 (class 2620 OID 179269)
-- Name: area trg_audit_area_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_area_insert BEFORE INSERT ON public.area FOR EACH ROW EXECUTE FUNCTION public.audit_area_insert();


--
-- TOC entry 4885 (class 2620 OID 179271)
-- Name: area trg_audit_area_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_area_update BEFORE UPDATE ON public.area FOR EACH ROW EXECUTE FUNCTION public.audit_area_update();


--
-- TOC entry 4894 (class 2620 OID 179261)
-- Name: consumible trg_audit_consumible_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_consumible_insert BEFORE INSERT ON public.consumible FOR EACH ROW EXECUTE FUNCTION public.audit_consumible_insert();


--
-- TOC entry 4895 (class 2620 OID 179263)
-- Name: consumible trg_audit_consumible_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_consumible_update BEFORE UPDATE ON public.consumible FOR EACH ROW EXECUTE FUNCTION public.audit_consumible_update();


--
-- TOC entry 4886 (class 2620 OID 179245)
-- Name: marca trg_audit_marcas_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_marcas_insert BEFORE INSERT ON public.marca FOR EACH ROW EXECUTE FUNCTION public.audit_marcas_insert();


--
-- TOC entry 4887 (class 2620 OID 179247)
-- Name: marca trg_audit_marcas_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_marcas_update BEFORE UPDATE ON public.marca FOR EACH ROW EXECUTE FUNCTION public.audit_marcas_update();


--
-- TOC entry 4896 (class 2620 OID 179273)
-- Name: modelo_consumible trg_audit_modelo_consumible_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_modelo_consumible_insert BEFORE INSERT ON public.modelo_consumible FOR EACH ROW EXECUTE FUNCTION public.audit_modelo_consumible_insert();


--
-- TOC entry 4897 (class 2620 OID 179275)
-- Name: modelo_consumible trg_audit_modelo_consumible_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_modelo_consumible_update BEFORE UPDATE ON public.modelo_consumible FOR EACH ROW EXECUTE FUNCTION public.audit_modelo_consumible_update();


--
-- TOC entry 4890 (class 2620 OID 179249)
-- Name: modelo trg_audit_modelo_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_modelo_insert BEFORE INSERT ON public.modelo FOR EACH ROW EXECUTE FUNCTION public.audit_modelo_insert();


--
-- TOC entry 4891 (class 2620 OID 179251)
-- Name: modelo trg_audit_modelo_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_modelo_update BEFORE UPDATE ON public.modelo FOR EACH ROW EXECUTE FUNCTION public.audit_modelo_update();


--
-- TOC entry 4882 (class 2620 OID 179265)
-- Name: sede trg_audit_sede_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_sede_insert BEFORE INSERT ON public.sede FOR EACH ROW EXECUTE FUNCTION public.audit_sede_insert();


--
-- TOC entry 4883 (class 2620 OID 179267)
-- Name: sede trg_audit_sede_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_sede_update BEFORE UPDATE ON public.sede FOR EACH ROW EXECUTE FUNCTION public.audit_sede_update();


--
-- TOC entry 4892 (class 2620 OID 179253)
-- Name: tipo_consumible trg_audit_tipo_consumible_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_tipo_consumible_insert BEFORE INSERT ON public.tipo_consumible FOR EACH ROW EXECUTE FUNCTION public.audit_tipo_consumible_insert();


--
-- TOC entry 4893 (class 2620 OID 179255)
-- Name: tipo_consumible trg_audit_tipo_consumible_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_tipo_consumible_update BEFORE UPDATE ON public.tipo_consumible FOR EACH ROW EXECUTE FUNCTION public.audit_tipo_consumible_update();


--
-- TOC entry 4888 (class 2620 OID 179257)
-- Name: tipo_equipo trg_audit_tipo_equipo_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_tipo_equipo_insert BEFORE INSERT ON public.tipo_equipo FOR EACH ROW EXECUTE FUNCTION public.audit_tipo_equipo_insert();


--
-- TOC entry 4889 (class 2620 OID 179259)
-- Name: tipo_equipo trg_audit_tipo_equipo_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_tipo_equipo_update BEFORE UPDATE ON public.tipo_equipo FOR EACH ROW EXECUTE FUNCTION public.audit_tipo_equipo_update();


--
-- TOC entry 4880 (class 2620 OID 179241)
-- Name: usuarios trg_audit_usuarios_insert; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_usuarios_insert BEFORE INSERT ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.audit_usuarios_insert();


--
-- TOC entry 4881 (class 2620 OID 179243)
-- Name: usuarios trg_audit_usuarios_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_audit_usuarios_update BEFORE UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.audit_usuarios_update();


--
-- TOC entry 4866 (class 2606 OID 179235)
-- Name: area fk_area_sede; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.area
    ADD CONSTRAINT fk_area_sede FOREIGN KEY (id_sede) REFERENCES public.sede(id_sede);


--
-- TOC entry 4869 (class 2606 OID 179220)
-- Name: consumible fk_consumible_marca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumible
    ADD CONSTRAINT fk_consumible_marca FOREIGN KEY (id_marca) REFERENCES public.marca(id_marca);


--
-- TOC entry 4870 (class 2606 OID 179215)
-- Name: consumible fk_consumible_tipo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumible
    ADD CONSTRAINT fk_consumible_tipo FOREIGN KEY (id_tipo_consumible) REFERENCES public.tipo_consumible(id_tipo_consumible);


--
-- TOC entry 4871 (class 2606 OID 179230)
-- Name: modelo_consumible fk_modelo_consumible_consumible; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo_consumible
    ADD CONSTRAINT fk_modelo_consumible_consumible FOREIGN KEY (id_consumible) REFERENCES public.consumible(id_consumible);


--
-- TOC entry 4872 (class 2606 OID 179225)
-- Name: modelo_consumible fk_modelo_consumible_modelo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo_consumible
    ADD CONSTRAINT fk_modelo_consumible_modelo FOREIGN KEY (id_modelo) REFERENCES public.modelo(id_modelo);


--
-- TOC entry 4867 (class 2606 OID 179205)
-- Name: modelo fk_modelo_marca; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT fk_modelo_marca FOREIGN KEY (id_marca) REFERENCES public.marca(id_marca);


--
-- TOC entry 4868 (class 2606 OID 179210)
-- Name: modelo fk_modelo_tipo_equipo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modelo
    ADD CONSTRAINT fk_modelo_tipo_equipo FOREIGN KEY (id_tipo_equipo) REFERENCES public.tipo_equipo(id_tipo_equipo);


--
-- TOC entry 4873 (class 2606 OID 179175)
-- Name: ticket fk_ticket_area; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_ticket_area FOREIGN KEY (id_area) REFERENCES public.area(id_area);


--
-- TOC entry 4874 (class 2606 OID 179190)
-- Name: ticket fk_ticket_consumible; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_ticket_consumible FOREIGN KEY (id_consumible) REFERENCES public.consumible(id_consumible);


--
-- TOC entry 4875 (class 2606 OID 179180)
-- Name: ticket fk_ticket_modelo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_ticket_modelo FOREIGN KEY (id_modelo) REFERENCES public.modelo(id_modelo);


--
-- TOC entry 4876 (class 2606 OID 179185)
-- Name: ticket fk_ticket_tipo_consumible; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_ticket_tipo_consumible FOREIGN KEY (id_tipo_consumible) REFERENCES public.tipo_consumible(id_tipo_consumible);


--
-- TOC entry 4877 (class 2606 OID 179170)
-- Name: ticket fk_ticket_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_ticket_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4878 (class 2606 OID 179200)
-- Name: ticket fk_ticket_usuario_al; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_ticket_usuario_al FOREIGN KEY (id_usuario_al) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4879 (class 2606 OID 179195)
-- Name: ticket fk_ticket_usuario_ti; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT fk_ticket_usuario_ti FOREIGN KEY (id_usuario_ti) REFERENCES public.usuarios(id_usuario);


--
-- TOC entry 4865 (class 2606 OID 179165)
-- Name: usuarios fk_usuario_rol; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol);


-- Completed on 2026-10-22 12:52:49

--
-- PostgreSQL database dump complete
--

