--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

-- Started on 2023-11-05 22:34:22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 98441)
-- Name: short_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.short_links (
    id bigint NOT NULL,
    short_link character varying(20) NOT NULL,
    original_link character varying(400) NOT NULL
);


ALTER TABLE public.short_links OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 98440)
-- Name: short_links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.short_links_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.short_links_id_seq OWNER TO postgres;

--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 214
-- Name: short_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.short_links_id_seq OWNED BY public.short_links.id;


--
-- TOC entry 3173 (class 2604 OID 98444)
-- Name: short_links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.short_links ALTER COLUMN id SET DEFAULT nextval('public.short_links_id_seq'::regclass);


--
-- TOC entry 3323 (class 0 OID 98441)
-- Dependencies: 215
-- Data for Name: short_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.short_links (id, short_link, original_link) FROM stdin;
\.


--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 214
-- Name: short_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.short_links_id_seq', 4, true);


--
-- TOC entry 3175 (class 2606 OID 98448)
-- Name: short_links orig_link_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.short_links
    ADD CONSTRAINT orig_link_unique UNIQUE (original_link);


--
-- TOC entry 3177 (class 2606 OID 98450)
-- Name: short_links short_link_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.short_links
    ADD CONSTRAINT short_link_unique UNIQUE (short_link);


--
-- TOC entry 3179 (class 2606 OID 98446)
-- Name: short_links short_links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.short_links
    ADD CONSTRAINT short_links_pkey PRIMARY KEY (id);


-- Completed on 2023-11-05 22:34:22

--
-- PostgreSQL database dump complete
--

