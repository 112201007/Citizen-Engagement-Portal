--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Ubuntu 17.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 17.2 (Ubuntu 17.2-1.pgdg20.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    admin_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_admin_id_seq OWNER TO postgres;

--
-- Name: admins_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_admin_id_seq OWNED BY public.admins.admin_id;


--
-- Name: citizens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.citizens (
    citizen_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(15),
    address text NOT NULL
);


ALTER TABLE public.citizens OWNER TO postgres;

--
-- Name: citizens_citizen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.citizens_citizen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.citizens_citizen_id_seq OWNER TO postgres;

--
-- Name: citizens_citizen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.citizens_citizen_id_seq OWNED BY public.citizens.citizen_id;


--
-- Name: issues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.issues (
    issue_id integer NOT NULL,
    citizen_id integer,
    issue_type character varying(50) NOT NULL,
    description text NOT NULL,
    status character varying(20) DEFAULT 'Reported'::character varying,
    department text,
    assigned_worker integer,
    location text
);


ALTER TABLE public.issues OWNER TO postgres;

--
-- Name: issues_issue_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.issues_issue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.issues_issue_id_seq OWNER TO postgres;

--
-- Name: issues_issue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.issues_issue_id_seq OWNED BY public.issues.issue_id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    task_id integer NOT NULL,
    issue_id integer,
    worker_id integer,
    assigned_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(20) DEFAULT 'Pending'::character varying
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_task_id_seq OWNER TO postgres;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;


--
-- Name: workers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workers (
    worker_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(15),
    assigned_tasks integer DEFAULT 0
);


ALTER TABLE public.workers OWNER TO postgres;

--
-- Name: workers_worker_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workers_worker_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.workers_worker_id_seq OWNER TO postgres;

--
-- Name: workers_worker_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workers_worker_id_seq OWNED BY public.workers.worker_id;


--
-- Name: admins admin_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN admin_id SET DEFAULT nextval('public.admins_admin_id_seq'::regclass);


--
-- Name: citizens citizen_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens ALTER COLUMN citizen_id SET DEFAULT nextval('public.citizens_citizen_id_seq'::regclass);


--
-- Name: issues issue_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues ALTER COLUMN issue_id SET DEFAULT nextval('public.issues_issue_id_seq'::regclass);


--
-- Name: tasks task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);


--
-- Name: workers worker_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workers ALTER COLUMN worker_id SET DEFAULT nextval('public.workers_worker_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (admin_id, username, password) FROM stdin;
\.


--
-- Data for Name: citizens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.citizens (citizen_id, name, email, phone, address) FROM stdin;
1	krishna	krishna@gmail.com	9825087592	krishna nagar, dwarka
2	radha	radha@gmail.com	9785321456	radha nagar, dwarka
\.


--
-- Data for Name: issues; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.issues (issue_id, citizen_id, issue_type, description, status, department, assigned_worker, location) FROM stdin;
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (task_id, issue_id, worker_id, assigned_at, status) FROM stdin;
\.


--
-- Data for Name: workers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workers (worker_id, name, email, phone, assigned_tasks) FROM stdin;
1	abc	abc@gmail.com	9801234567	0
\.


--
-- Name: admins_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_admin_id_seq', 1, false);


--
-- Name: citizens_citizen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.citizens_citizen_id_seq', 1, false);


--
-- Name: issues_issue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.issues_issue_id_seq', 3, true);


--
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 1, false);


--
-- Name: workers_worker_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workers_worker_id_seq', 1, false);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (admin_id);


--
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- Name: citizens citizens_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_email_key UNIQUE (email);


--
-- Name: citizens citizens_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_phone_key UNIQUE (phone);


--
-- Name: citizens citizens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_pkey PRIMARY KEY (citizen_id);


--
-- Name: issues issues_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (issue_id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);


--
-- Name: workers workers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_email_key UNIQUE (email);


--
-- Name: workers workers_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_phone_key UNIQUE (phone);


--
-- Name: workers workers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workers
    ADD CONSTRAINT workers_pkey PRIMARY KEY (worker_id);


--
-- Name: issues assigned_worker; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT assigned_worker FOREIGN KEY (assigned_worker) REFERENCES public.workers(worker_id);


--
-- Name: issues issues_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id);


--
-- Name: tasks tasks_issue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_issue_id_fkey FOREIGN KEY (issue_id) REFERENCES public.issues(issue_id);


--
-- Name: tasks tasks_worker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.workers(worker_id);


--
-- PostgreSQL database dump complete
--

