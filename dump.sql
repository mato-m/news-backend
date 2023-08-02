--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-08-02 20:42:58 CEST

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

--
-- TOC entry 10 (class 2615 OID 16852)
-- Name: newz; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA newz;


ALTER SCHEMA newz OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 237 (class 1259 OID 16882)
-- Name: article; Type: TABLE; Schema: newz; Owner: postgres
--

CREATE TABLE newz.article (
    art_id character varying(50) DEFAULT public.uuid_generate_v4() NOT NULL,
    art_title character varying(80) NOT NULL,
    art_img character varying(200),
    art_md character varying NOT NULL,
    art_sc character varying(50) NOT NULL,
    author character varying(50) NOT NULL,
    art_time timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE newz.article OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16867)
-- Name: cat; Type: TABLE; Schema: newz; Owner: postgres
--

CREATE TABLE newz.cat (
    cat_id character varying(50) DEFAULT public.uuid_generate_v4() NOT NULL,
    cat_name character varying(50) NOT NULL
);


ALTER TABLE newz.cat OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16890)
-- Name: comment; Type: TABLE; Schema: newz; Owner: postgres
--

CREATE TABLE newz.comment (
    comment_id character varying(50) DEFAULT public.uuid_generate_v4() NOT NULL,
    art_id character varying(50) NOT NULL,
    user_id character varying(50) NOT NULL,
    text character varying(300) NOT NULL,
    "time" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE newz.comment OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16872)
-- Name: subcat; Type: TABLE; Schema: newz; Owner: postgres
--

CREATE TABLE newz.subcat (
    sc_id character varying(50) DEFAULT public.uuid_generate_v4() NOT NULL,
    sc_name character varying(50) NOT NULL,
    cat_id character varying(50) NOT NULL
);


ALTER TABLE newz.subcat OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16853)
-- Name: tags; Type: TABLE; Schema: newz; Owner: postgres
--

CREATE TABLE newz.tags (
    art_id character varying(50) NOT NULL,
    tag character varying(50) NOT NULL
);


ALTER TABLE newz.tags OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16858)
-- Name: usr; Type: TABLE; Schema: newz; Owner: postgres
--

CREATE TABLE newz.usr (
    user_id character varying(50) DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(25) NOT NULL,
    email character varying(50) NOT NULL,
    pass character varying(80) NOT NULL,
    role smallint DEFAULT 0 NOT NULL
);


ALTER TABLE newz.usr OWNER TO postgres;

--
-- TOC entry 3727 (class 0 OID 16882)
-- Dependencies: 237
-- Data for Name: article; Type: TABLE DATA; Schema: newz; Owner: postgres
--

COPY newz.article (art_id, art_title, art_img, art_md, art_sc, author, art_time) FROM stdin;
58655bd7-7e18-4a0c-9e08-2bccf29115f9	Apple devices	1690955215625-88436337-appleproductlineup.jpg	# Some Apple gadgets i use\r\n\r\n1. **Apple Watch** SE 2022\r\n2. **iPhone** 14 Pro\r\n3. **Airpods** Pro 2\r\n4. **Macbook Pro** M2 13''	2256a3e1-43f0-4f52-b2ba-04198bc61d77	17a000ca-286f-49a7-b11a-e8b940b5a506	2023-08-02 02:17:18.355607
74074cae-8705-48a5-9846-00325ac71d33	Movies I've watched this year	1690955199929-655195778-MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg	## in Cinema\r\n### in Podgorica, Montenegro\r\n\r\n<iframe width="560" height="315" src="https://www.youtube.com/embed/bK6ldnjE3Y0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\r\n\r\n1. Oppenheimer\r\n2. Spider-man 2\r\n3. John Wick 4\r\n4. Avatar 2\r\n5. Creed 3	1a3a4ef6-cf14-4691-aa11-3be65b3c9a2e	17a000ca-286f-49a7-b11a-e8b940b5a506	2023-08-02 02:19:11.14389
dfd717c6-fa78-4797-9c4c-9711555d3e27	My favorite musicians	1690955098976-811248406-The_Weeknd_Portrait_by_Brian_Ziff.jpg	1. The Weeknd\r\n2. Kanye West\r\n3. Travis Scott\r\n4. Frank Ocean\r\n5. Central Cee	24c5ea28-bd79-4e25-88f0-81db653c37d8	17a000ca-286f-49a7-b11a-e8b940b5a506	2023-08-02 02:20:18.099272
999bceb2-9587-437e-90a7-f394b70496d0	My favorite football teams	1690955116627-494159859-GOAL_-_Blank_WEB_-_Facebook_-_2023-03-31T134149.308.webp	1. Inter Milan\r\n2. Manchester United\r\n3. Real Madrid\r\n4. PSG	c77abbe0-7618-4feb-a432-ffaaaf262def	17a000ca-286f-49a7-b11a-e8b940b5a506	2023-08-02 07:33:47.46623
d1137094-5ab2-4836-a6df-fc6d14d2131b	My favorite NBA teams and players	1690955409791-605763442-GFX-1082 NBA Players ranked FTR.jpg	# Teams\r\n1. Lakers\r\n2. Bulls\r\n3. Miami Heat\r\n\r\n# Players\r\n1. Derrick Rose\r\n2. LeBron James\r\n3. Kobe Bryant\r\n4. Michael Jordan\r\n5. Nikola Jokic	c0b045af-ad70-4763-b9c4-a7f63f8c98fa	17a000ca-286f-49a7-b11a-e8b940b5a506	2023-08-02 02:04:58.850893
01051a0c-ca51-4671-a846-0d126f08b970	Programming languages for AI	1690955423753-517832108-960x0.webp	# Some of the best languages\r\n\r\n## for working in AI are:\r\n1. Python\r\n2. Javascript\r\n3. R	f6c90093-3728-4f36-8a78-cff710e8d8ef	17a000ca-286f-49a7-b11a-e8b940b5a506	2023-08-02 02:03:59.969804
\.


--
-- TOC entry 3725 (class 0 OID 16867)
-- Dependencies: 235
-- Data for Name: cat; Type: TABLE DATA; Schema: newz; Owner: postgres
--

COPY newz.cat (cat_id, cat_name) FROM stdin;
bc8a19a3-5759-4924-998f-1af0991d0f1c	Entertainment
8b46a530-3933-4bcb-8cb6-3ccc57e4c8b5	Sports
df3eacc1-e48d-4245-a45b-d061daac1404	Technology
\.


--
-- TOC entry 3728 (class 0 OID 16890)
-- Dependencies: 238
-- Data for Name: comment; Type: TABLE DATA; Schema: newz; Owner: postgres
--

COPY newz.comment (comment_id, art_id, user_id, text, "time") FROM stdin;
559582c8-616d-4c57-88f5-c3641bc7d781	74074cae-8705-48a5-9846-00325ac71d33	17a000ca-286f-49a7-b11a-e8b940b5a506	Oppenheimer is the best movie ever!	2023-08-02 02:20:40.095692
2ecbc1f3-6156-4273-b2b6-29ab995156ab	dfd717c6-fa78-4797-9c4c-9711555d3e27	17a000ca-286f-49a7-b11a-e8b940b5a506	Test	2023-08-02 07:26:06.187488
\.


--
-- TOC entry 3726 (class 0 OID 16872)
-- Dependencies: 236
-- Data for Name: subcat; Type: TABLE DATA; Schema: newz; Owner: postgres
--

COPY newz.subcat (sc_id, sc_name, cat_id) FROM stdin;
24c5ea28-bd79-4e25-88f0-81db653c37d8	Music	bc8a19a3-5759-4924-998f-1af0991d0f1c
1a3a4ef6-cf14-4691-aa11-3be65b3c9a2e	Movies	bc8a19a3-5759-4924-998f-1af0991d0f1c
85268a4a-8946-4430-b89f-5231198b9db9	TV	bc8a19a3-5759-4924-998f-1af0991d0f1c
c77abbe0-7618-4feb-a432-ffaaaf262def	Football	8b46a530-3933-4bcb-8cb6-3ccc57e4c8b5
c0b045af-ad70-4763-b9c4-a7f63f8c98fa	Basketball	8b46a530-3933-4bcb-8cb6-3ccc57e4c8b5
f6c90093-3728-4f36-8a78-cff710e8d8ef	AI	df3eacc1-e48d-4245-a45b-d061daac1404
2256a3e1-43f0-4f52-b2ba-04198bc61d77	Gadgets	df3eacc1-e48d-4245-a45b-d061daac1404
\.


--
-- TOC entry 3723 (class 0 OID 16853)
-- Dependencies: 233
-- Data for Name: tags; Type: TABLE DATA; Schema: newz; Owner: postgres
--

COPY newz.tags (art_id, tag) FROM stdin;
dfd717c6-fa78-4797-9c4c-9711555d3e27	music
dfd717c6-fa78-4797-9c4c-9711555d3e27	hip hop
dfd717c6-fa78-4797-9c4c-9711555d3e27	rnb
999bceb2-9587-437e-90a7-f394b70496d0	football
999bceb2-9587-437e-90a7-f394b70496d0	sport
74074cae-8705-48a5-9846-00325ac71d33	cinema
58655bd7-7e18-4a0c-9e08-2bccf29115f9	apple
d1137094-5ab2-4836-a6df-fc6d14d2131b	nba
d1137094-5ab2-4836-a6df-fc6d14d2131b	basketball
01051a0c-ca51-4671-a846-0d126f08b970	ai
01051a0c-ca51-4671-a846-0d126f08b970	programming
\.


--
-- TOC entry 3724 (class 0 OID 16858)
-- Dependencies: 234
-- Data for Name: usr; Type: TABLE DATA; Schema: newz; Owner: postgres
--

COPY newz.usr (user_id, username, email, pass, role) FROM stdin;
8779f783-1732-41cd-820a-22805ea4e45a	jane_smith	jane@example.com	$2a$12$moX/JANChmifEGuSnc2efuHtv.ogW/YM5Kgf8VjObPFxutUqz5B.i	0
d7000d06-b073-40ec-b46c-da37e8fb04f8	emily_johnson	emily@example.com	$2a$12$jcCOHMgceUeDR6Nlx1ytX..70ypHZPVHubnuGdi2cYnfrAn4XD0US	0
b9893f84-efbb-4751-8f42-ea7b059fb42c	michael_brown	michael@example.com	$2a$12$xHyf1bKYr.pgDlT1McD6aOCc5waI2kZf1RF0B3/T7cvRj.RehiMPi	0
344c1f6b-5d1b-441e-8aaa-5fd81f446d2a	user1	user1	$2b$10$bKMMWyzbNDhRd.Bz/HOU0ettElyouvwrl.HF96fdz7ihm2AKlYLF6	0
777a3ba5-51a4-4ee3-bab8-493a72ea6d35	user2	user2	$2b$10$tMYtGVusoDmb/O3VnpnyvunEBM6obSBnYC2i1QWT220T4xNGKO0mi	0
15fd7c4e-bfb5-4450-9eb7-1ef2deb79c09	alex_miller	alex@example.com	$2a$12$EW16Nbgpm8sy2nD6yD4.KearyQ3uas7tAvFAvLfocWknMCd0gIh1K	1
17a000ca-286f-49a7-b11a-e8b940b5a506	admin	admin	$2b$10$rKAYokMazPjL1jVISP2twOsVfGoF0sfAhkxmjJO3oUjtyJ/gCsoo.	1
3326d4bd-49b3-4932-baf6-f88379c4026a	testuser	testuser	$2b$10$gmN.9KsUxv82jHCP73o/d.F7qzQAuMgLk5RXuSDGbQaZx3nx/Or52	0
5e7f1e0a-eb26-43cb-ab53-ec3c3152ed9e	biciklo	biciklo	biciklo	0
c3a1e2d3-7d22-46c9-bbda-0fb2fb8aade2	bici	bici	bici	0
\.


--
-- TOC entry 3572 (class 2606 OID 16889)
-- Name: article article_pkey; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.article
    ADD CONSTRAINT article_pkey PRIMARY KEY (art_id);


--
-- TOC entry 3568 (class 2606 OID 16871)
-- Name: cat cat_pkey; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.cat
    ADD CONSTRAINT cat_pkey PRIMARY KEY (cat_id);


--
-- TOC entry 3574 (class 2606 OID 16894)
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3562 (class 2606 OID 16866)
-- Name: usr email_uq; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.usr
    ADD CONSTRAINT email_uq UNIQUE (email);


--
-- TOC entry 3570 (class 2606 OID 16876)
-- Name: subcat subcat_pkey; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.subcat
    ADD CONSTRAINT subcat_pkey PRIMARY KEY (sc_id);


--
-- TOC entry 3560 (class 2606 OID 16916)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (art_id, tag);


--
-- TOC entry 3564 (class 2606 OID 16862)
-- Name: usr user_pkey; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.usr
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3566 (class 2606 OID 16864)
-- Name: usr username_uq; Type: CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.usr
    ADD CONSTRAINT username_uq UNIQUE (username);


--
-- TOC entry 3579 (class 2606 OID 16985)
-- Name: comment art_fk; Type: FK CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.comment
    ADD CONSTRAINT art_fk FOREIGN KEY (art_id) REFERENCES newz.article(art_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3577 (class 2606 OID 17000)
-- Name: article author_fk; Type: FK CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.article
    ADD CONSTRAINT author_fk FOREIGN KEY (author) REFERENCES newz.usr(user_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3576 (class 2606 OID 16995)
-- Name: subcat cat_fk; Type: FK CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.subcat
    ADD CONSTRAINT cat_fk FOREIGN KEY (cat_id) REFERENCES newz.cat(cat_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3578 (class 2606 OID 17005)
-- Name: article sc_fk; Type: FK CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.article
    ADD CONSTRAINT sc_fk FOREIGN KEY (art_sc) REFERENCES newz.subcat(sc_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3575 (class 2606 OID 17011)
-- Name: tags tag_fk; Type: FK CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.tags
    ADD CONSTRAINT tag_fk FOREIGN KEY (art_id) REFERENCES newz.article(art_id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3580 (class 2606 OID 16990)
-- Name: comment usr_fk; Type: FK CONSTRAINT; Schema: newz; Owner: postgres
--

ALTER TABLE ONLY newz.comment
    ADD CONSTRAINT usr_fk FOREIGN KEY (user_id) REFERENCES newz.usr(user_id) ON DELETE CASCADE NOT VALID;


-- Completed on 2023-08-02 20:42:59 CEST

--
-- PostgreSQL database dump complete
--

