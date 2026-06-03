-- Database Dump for Dashboard Kinerja PENS
-- Generated on 2026-06-03 18:22:13
-- Database: PostgreSQL (Supabase)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- --------------------------------------------------------
-- Table structure for table "units"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "units" CASCADE;

CREATE TABLE "units" (
    "id" BIGINT NOT NULL DEFAULT nextval('units_id_seq'::regclass),
    "name" CHARACTER VARYING(255) NOT NULL,
    "type" CHARACTER VARYING(255),
    "created_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY ("id")
);

-- Dumping data for table "units"
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (1, 'Departemen', NULL, '2026-06-03 17:15:43', '2026-06-03 17:15:43');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (2, 'Unit Training dan Sertifikasi', NULL, '2026-06-03 17:15:47', '2026-06-03 17:15:47');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (3, 'KUI', NULL, '2026-06-03 17:15:50', '2026-06-03 17:15:50');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (4, 'Kemahasiswaan', NULL, '2026-06-03 17:15:52', '2026-06-03 17:15:52');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (5, 'PPMPP', NULL, '2026-06-03 17:15:56', '2026-06-03 17:15:56');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (6, 'Prodi', NULL, '2026-06-03 17:16:00', '2026-06-03 17:16:00');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (7, 'Kepegawaian', NULL, '2026-06-03 17:16:08', '2026-06-03 17:16:08');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (8, 'P3M', NULL, '2026-06-03 17:16:12', '2026-06-03 17:16:12');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (9, 'Kerjasama', NULL, '2026-06-03 17:16:15', '2026-06-03 17:16:15');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (10, 'JAS', NULL, '2026-06-03 17:16:26', '2026-06-03 17:16:26');
INSERT INTO "units" ("id", "name", "type", "created_at", "updated_at") VALUES (11, 'UPP', NULL, '2026-06-03 17:17:10', '2026-06-03 17:17:10');

-- --------------------------------------------------------
-- Table structure for table "users"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users" (
    "id" BIGINT NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" CHARACTER VARYING(255) NOT NULL,
    "email" CHARACTER VARYING(255) NOT NULL,
    "email_verified_at" TIMESTAMP WITHOUT TIME ZONE,
    "password" CHARACTER VARYING(255) NOT NULL,
    "role" CHARACTER VARYING(255) NOT NULL DEFAULT 'unit_kerja'::character varying,
    "remember_token" CHARACTER VARYING(100),
    "created_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    "unit_id" BIGINT,
    PRIMARY KEY ("id")
);

-- Dumping data for table "users"
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (1, 'Dr.-Ing. Ir. Arif Irwansyah, S.T., M.Eng.', 'direktur@pens.ac.id', NULL, '$2y$12$3dbWhWqKEkqFmuA0B.sgVOLLZJA42KENvbbkufcMNmmT3/Mb7hp2m', 'direktur', NULL, '2026-06-03 17:15:39', '2026-06-03 17:15:39', NULL);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (2, 'Prof. Moch. Zen Samsono Hadi, ST., M.Sc., Ph.D. (Akademik)', 'wadir1@pens.ac.id', NULL, '$2y$12$z4nokpiFwW8Xpw5CwjU/eek9IIKbmFkU2moC3D.Q3kTokcjRqkvf.', 'wadir', NULL, '2026-06-03 17:15:39', '2026-06-03 17:15:39', NULL);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (3, 'Dr. Bima Sena Bayu Dewantara, S.ST., M.T. (Keuangan & Umum)', 'wadir2@pens.ac.id', NULL, '$2y$12$cqBkrEx1U/G1Ca7frfnOz.Nlg6CE54YogPwB38kMbvfTOEbr5Cf/G', 'wadir', NULL, '2026-06-03 17:15:40', '2026-06-03 17:15:40', NULL);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (4, 'Kholid Fathoni, S.Kom., M.T. (Kemahasiswaan)', 'wadir3@pens.ac.id', NULL, '$2y$12$sWeLvGHJ8Yx4aq.GErQ62uWRBuLLa5YITXIrfnG/iAADNcN19aYUG', 'wadir', NULL, '2026-06-03 17:15:41', '2026-06-03 17:15:41', NULL);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (5, 'Dr. Ir. Firman Arifin, S.T., M.T. (Kerjasama & Humas)', 'wadir4@pens.ac.id', NULL, '$2y$12$Ws2o4vSaPb0oetzqBAfq0e6AwzyAf914UXEzcCP9qVPYxj7CRwgkW', 'wadir', NULL, '2026-06-03 17:15:42', '2026-06-03 17:15:42', NULL);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (6, 'Super Administrator', 'superadmin@pens.ac.id', NULL, '$2y$12$/qjRXZvHifut67IwuX/v3ekTFkp2J.Qq4Y2EWD.YbAshhBSQ7WBpC', 'superadmin', NULL, '2026-06-03 17:15:42', '2026-06-03 17:15:42', NULL);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (7, 'Unit Departemen', 'departemen@pens.ac.id', NULL, '$2y$12$3uGigAi8hMvIH/lMaqZj/ecNrYVtuBlkpr/8nDDvwI8f.hNOSD29m', 'unit_kerja', NULL, '2026-06-03 17:15:44', '2026-06-03 17:15:44', 1);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (8, 'Unit Unit Training dan Sertifikasi', 'unit-training-dan-sertifikasi@pens.ac.id', NULL, '$2y$12$aW0enzfrWhSRBx9QXVSWiedv1mGbLWKcgB0.dmKIUM3yFeU.VuCnu', 'unit_kerja', NULL, '2026-06-03 17:15:48', '2026-06-03 17:15:48', 2);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (9, 'Unit KUI', 'kui@pens.ac.id', NULL, '$2y$12$RhJGxG7/n7QdvNW67jZBNuVIrzn18KUN66NS2QBE/AxTQiEEsIBzO', 'unit_kerja', NULL, '2026-06-03 17:15:50', '2026-06-03 17:15:50', 3);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (10, 'Unit Kemahasiswaan', 'kemahasiswaan@pens.ac.id', NULL, '$2y$12$.MilHLNHTSeJ/XsDHqWJoe/Tg4yumruPVSRBvcWgOdh3ePhShNG/q', 'unit_kerja', NULL, '2026-06-03 17:15:52', '2026-06-03 17:15:52', 4);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (11, 'Dr. Ir. Hary Oktavianto, S.T., M.Eng. (PPMPP)', 'ppmpp@pens.ac.id', NULL, '$2y$12$vZcjceNj9B/bFgEdfLpfF.lqnHY8cm3N8./YYgJjvGJpyOhzz4Zda', 'unit_kerja', NULL, '2026-06-03 17:15:56', '2026-06-03 17:15:56', 5);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (12, 'Unit Prodi', 'prodi@pens.ac.id', NULL, '$2y$12$akenjC7G/jUXF8x87/krAOOylmqQZRztXRxh8AiPgf2ETlOcjSGCW', 'unit_kerja', NULL, '2026-06-03 17:16:00', '2026-06-03 17:16:00', 6);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (13, 'Unit Kepegawaian', 'kepegawaian@pens.ac.id', NULL, '$2y$12$E2KTdAwKe4sEB8Gz6tMyMuEU2yBLOrWDKfEzw8YTrA.VtNOOERfJ.', 'unit_kerja', NULL, '2026-06-03 17:16:09', '2026-06-03 17:16:09', 7);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (14, 'Prof. Dr. Mike Yuliana, S.T, M.T. (P3M)', 'p3m@pens.ac.id', NULL, '$2y$12$9oCnmfUVOXIE6Gynf.Z88uxo4D7JV2r3OrH4N682vdXWU/6xusX92', 'unit_kerja', NULL, '2026-06-03 17:16:13', '2026-06-03 17:16:13', 8);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (15, 'Unit Kerjasama', 'kerjasama@pens.ac.id', NULL, '$2y$12$PL8sfp1WkkDkJL5zMvyrlONytqfZiVeRzYVD4jZhlFx7WFC85n97W', 'unit_kerja', NULL, '2026-06-03 17:16:16', '2026-06-03 17:16:16', 9);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (16, 'Unit JAS', 'jas@pens.ac.id', NULL, '$2y$12$1wQAOGdXlilbnIRyF67gReqzkNtTS2x5UDxBOG4IWuU/KP5nStNMi', 'unit_kerja', NULL, '2026-06-03 17:16:27', '2026-06-03 17:16:27', 10);
INSERT INTO "users" ("id", "name", "email", "email_verified_at", "password", "role", "remember_token", "created_at", "updated_at", "unit_id") VALUES (17, 'Unit UPP', 'upp@pens.ac.id', NULL, '$2y$12$FOk5MBjK3/IBgY47EnrPRO9BN4xICOO5m7ac5oWDtQ0Rn5I94vYDe', 'unit_kerja', NULL, '2026-06-03 17:17:11', '2026-06-03 17:17:11', 11);

-- --------------------------------------------------------
-- Table structure for table "indicators"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "indicators" CASCADE;

CREATE TABLE "indicators" (
    "id" BIGINT NOT NULL DEFAULT nextval('indicators_id_seq'::regclass),
    "code" CHARACTER VARYING(255) NOT NULL,
    "description" TEXT NOT NULL,
    "data_type" CHARACTER VARYING(255) NOT NULL DEFAULT 'percent'::character varying,
    "created_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    "formula" TEXT,
    "numerator_label" CHARACTER VARYING(255),
    "denominator_label" CHARACTER VARYING(255),
    PRIMARY KEY ("id")
);

-- Dumping data for table "indicators"
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (1, 'IKU-01', 'Rasio dosen bersertifikat kompetensi', 'percent', '2026-06-03 17:15:43', '2026-06-03 17:15:43', 'Mengukur proporsi dosen yang memiliki gelar Doktor (S3) dibandingkan dengan total jumlah dosen di program studi. Semakin tinggi rasio ini, semakin baik kualitas akademik dan kapasitas riset di program studi. Dosen berkualifikasi S3 umumnya lebih aktif dalam penelitian, publikasi, dan kolaborasi akademik yang meningkatkan reputasi program studi.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (2, 'IKU-02', 'Rasio dosen yang melaksanakan magang di industri', 'percent', '2026-06-03 17:15:45', '2026-06-03 17:15:45', 'Menilai keterlibatan dosen dalam program magang atau praktik langsung di industri guna memperbarui wawasan dan menyelaraskan proses pembelajaran dengan kebutuhan dunia usaha dan dunia industri (DUDI)', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (3, 'IKU-03', 'Rasi0 mahasiswa yang bersertifikat kompetensi', 'percent', '2026-06-03 17:15:47', '2026-06-03 17:15:47', 'Persentase mahasiswa yang berhasil memperoleh sertifikat kompetensi dari lembaga resmi sebagai bukti penguasaan keahlian tertentu yang dibutuhkan industri.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (4, 'IKU-04', 'Rasio magasiswa yang mengikuti program internasional', 'percent', '2026-06-03 17:15:49', '2026-06-03 17:15:49', 'Menggambarkan keterlibatan mahasiswa dalam kegiatan internasional seperti student exchange, joint project, atau magang sebagai 25 upaya meningkatkan wawasan dan daya saing global.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (5, 'IKU-05', 'Rasio mahasiswa berprestasi tingkat nasional', 'percent', '2026-06-03 17:15:51', '2026-06-03 17:15:51', 'Persentase mahasiswa yang memperoleh penghargaan atau prestasi dalam ajang kompetisi, lomba, atau kegiatan akademik dan non-akademik di tingkat nasional.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (6, 'IKU-06', 'Rasio mahasiswa berprestasi tingkat internasional', 'percent', '2026-06-03 17:15:53', '2026-06-03 17:15:53', 'Persentase mahasiswa yang meraih prestasi atau penghargaan dalam kompetisi dan kegiatan tingkat internasional, baik di bidang akademik dan non akademik', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (7, 'IKU-07', 'Rasio program studi dengan akreditasi unggul', 'percent', '2026-06-03 17:15:55', '2026-06-03 17:15:55', 'Proporsi program studi yang telah memperoleh status akreditasi “Unggul” dari lembaga akreditasi nasional sebagai pengakuan atas kualitas pengelolaan dan capaian pembelajaran', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (8, 'IKU-08', 'Rasio program studi dengan akreditasi internasional', 'percent', '2026-06-03 17:15:57', '2026-06-03 17:15:57', 'Proporsi program studi yang berhasil memperoleh akreditasi internasional seperti IABEE, ABET, AUN-QA, atau lembaga sejenis, sebagai indikator daya saing dan kualitas pendidikan global', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (9, 'IKU-09', 'Rasio program studi yang menerapkan Project Based Learning / PBL', 'percent', '2026-06-03 17:15:59', '2026-06-03 17:15:59', 'Persentase program studi yang mengimplementasikan PBL secara sistematis dalam kurikulum dan proses pembelajaran untuk mendukung pendekatan pendidikan terapan berbasis proyek', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (10, 'IKU-10', 'Rasio matakuliah berbasis PBL terhadap total mata kuliah praktik', 'percent', '2026-06-03 17:16:01', '2026-06-03 17:16:01', 'Mengukur sejauh mana metode PBL diterapkan pada mata kuliah praktik, yang menjadi cerminan integrasi pendekatan kontekstual dan aplikatif dalam proses pembelajaran', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (11, 'IKU-11', 'Junlah SKS matakuliah yang mendukung pengembangan soft skills', 'count', '2026-06-03 17:16:03', '2026-06-03 17:16:03', 'Total Satuan Kredit Semester (SKS) dari mata kuliah yang berfokus pada pengembangan soft skills, seperti kemampuan komunikasi, kepemimpinan, kerja tim, dan pemecahan masalah', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (12, 'IKU-12', 'Jumlah program studi yang mendukung pengembangan kewirausahaan LABORATORY BASED EDUCATION', 'boolean', '2026-06-03 17:16:05', '2026-06-03 17:16:05', 'Menunjukkan jumlah program studi yang memiliki elemen pembelajaran atau kegiatan yang mendorong munculnya semangat dan', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (13, 'IKU-13', 'Rasio dosen yang berkualifikasi akademik S3', 'percent', '2026-06-03 17:16:07', '2026-06-03 17:16:07', 'Mengukur proporsi dosen yang memiliki gelar Doktor (S3) dibandingkan dengan total jumlah dosen di program studi. Semakin tinggi rasio ini, semakin baik kualitas akademik dan kapasitas riset di program studi. Dosen berkualifikasi S3 umumnya lebih aktif dalam penelitian, publikasi, dan kolaborasi akademik yang meningkatkan reputasi program studi.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (14, 'IKU-14', 'Rasio dosen yang terlibat dalam kegiatan penelitian', 'percent', '2026-06-03 17:16:10', '2026-06-03 17:16:10', 'Indikator ini mengukur proporsi dosen yang terlibat dalam penelitian dibandingkan total dosen di program studi. Tingginya rasio ini menunjukkan budaya riset yang kuat di lingkungan akademik, yang berdampak positif pada pengembangan ilmu pengetahuan dan kualitas pembelajaran berbasis laboratorium.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (15, 'IKU-15', 'Rasio dosen yang terlibat dalam proyek kerjasama dengan industri', 'percent', '2026-06-03 17:16:14', '2026-06-03 17:16:14', 'Menunjukkan jumlah dosen yang terlibat dalam proyek kerja sama dengan industri dibandingkan total dosen di program studi. Kolaborasi dengan industri menunjukkan relevansi penelitian dan keterlibatan akademisi dalam menyelesaikan masalah nyata yang dihadapi dunia industri.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (16, 'IKU-16', 'Rasio dosen yang mempunyai publikasi di jurnal terindeks Q1-Q4', 'percent', '2026-06-03 17:16:17', '2026-06-03 17:16:17', 'Mengukur proporsi dosen yang memiliki publikasi ilmiah di jurnal Q1-Q4 dibandingkan total dosen di program studi. Publikasi dalam jurnal bereputasi internasional menunjukkan kualitas penelitian yang tinggi serta kontribusi akademik terhadap perkembangan ilmu pengetahuan.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (17, 'IKU-17', 'Rasio dosen yang memiliki paten atau paten sederhana', 'percent', '2026-06-03 17:16:20', '2026-06-03 17:16:20', 'Menunjukkan jumlah dosen yang berhasil menghasilkan paten atau paten sederhana dibandingkan total dosen di program studi. Paten mencerminkan inovasi dan hilirisasi hasil riset ke dalam bentuk teknologi atau produk yang dapat dimanfaatkan oleh masyarakat dan industri.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (18, 'IKU-18', 'Rasio mahasiswa yang terlibat dalam proyek industri atau penelitian', 'percent', '2026-06-03 17:16:23', '2026-06-03 17:16:23', 'Mengukur jumlah mahasiswa yang terlibat dalam proyek industri atau penelitian dibandingkan total mahasiswa di program studi. Rasio ini mencerminkan keterlibatan mahasiswa dalam pengalaman berbasis laboratorium dan dunia kerja, yang membantu mereka mengembangkan keterampilan praktis dan meningkatkan daya saing setelah lulus.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (19, 'IKU-19', 'Rasio lulusan yang telah bekerja pada saat kelulusan', 'percent', '2026-06-03 17:16:26', '2026-06-03 17:16:26', 'Menunjukkan persentase lulusan yang langsung mendapatkan pekerjaan pada saat kelulusan dibandingkan total lulusan dalam periode tertentu. Rasio ini menjadi salah satu indikator penting dalam mengukur kesiapan kerja lulusan dan relevansi kurikulum dengan kebutuhan industri.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (20, 'IKU-20', 'Rasio proyek akhir mahasiswa yang menyelesaikan permasalahan nyata', 'percent', '2026-06-03 17:16:29', '2026-06-03 17:16:29', 'Proyek Akhir adalah tugas berbasis proyek yang diberikan kepada mahasiswa sebagai syarat kelulusan. Indikator ini mengukur proporsi mahasiswa yang menyelesaikan proyek berbasis permasalahan nyata (baik dari industri, masyarakat, atau penelitian) dibandingkan total mahasiswa. Semakin tinggi rasio ini, semakin kuat pendekatan problem-based learning (PBL) yang diterapkan di program studi.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (21, 'IKU-21', 'Rasio kelulusan yang memperoleh IPK >= 3.5', 'percent', '2026-06-03 17:16:31', '2026-06-03 17:16:31', 'Mengukur persentase lulusan dengan IPK minimal 3,5 dibandingkan total lulusan. Rasio ini mencerminkan kualitas akademik mahasiswa dan efektivitas sistem pembelajaran di program studi.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (40, 'IKU-40', 'Rasio research group (RG) yang terlibat dalam proyek industri', 'percent', '2026-06-03 17:17:07', '2026-06-03 17:17:07', 'Merupakan perbandingan jumlah kelompok riset yang aktif terlibat dalam proyek-proyek industri terhadap total RG yang ada di PENS. Semakin tinggi rasio ini, semakin besar keterlibatan dosen/peneliti dalam dunia industri.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (22, 'IKU-22', 'Rasio mahasiswa asing yang mengikuti kegiatan akademik atau non akademik di kampus terhadap total jumlah mahasiswa APPLIED RESEARCH', 'percent', '2026-06-03 17:16:32', '2026-06-03 17:16:32', 'Menunjukkan proporsi mahasiswa asing yang berpartisipasi dalam kegiatan akademik atau non-akademik di kampus dibandingkan total mahasiswa. Mahasiswa asing dapat berpartisipasi melalui program pertukaran, magang, penelitian, atau kegiatan akademik lainnya. Rasio ini menjadi indikator internasionalisasi prodi, yang berpengaruh pada peringkat dan reputasi institusi di kancah global.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (23, 'IKU-23', 'Rasio penelitian kemitraan', 'percent', '2026-06-03 17:16:34', '2026-06-03 17:16:34', 'Rasio ini mengukur proporsi penelitian yang dilakukan dengan mitra eksternal, baik industri, pemerintah, maupun lembaga riset lainnya, terhadap total penelitian yang dilakukan di program studi. Pendanaan dapat berasal dari mitra maupun dari pemerintah. Semakin tinggi rasio ini, semakin baik keterlibatan program studi dalam kolaborasi penelitian yang berdampak.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (24, 'IKU-24', 'Rasio publikasi jurnal ilmiah terindeks Q1-Q4', 'percent', '2026-06-03 17:16:37', '2026-06-03 17:16:37', 'Indikator ini menunjukkan perbandingan jumlah publikasi di jurnal ilmiah yang masuk dalam kategori Quartile 1-Quartile 4 (Q1-Q4) dalam Scimago Journal Rank (SJR) atau Web of Science (WoS) terhadap jumlah total publikasi dosen di program studi. Rasio yang tinggi mencerminkan kualitas penelitian dan publikasi yang baik.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (25, 'IKU-25', 'Rasio publikasi di seminar internasional bereputasi (misalnya IEEE, ACM, Scopus)', 'percent', '2026-06-03 17:16:39', '2026-06-03 17:16:39', 'Mengukur rasio jumlah publikasi yang dipresentasikan di seminar internasional bereputasi, seperti yang terindeks IEEE, ACM, atau SCOPUS, terhadap total publikasi yang dihasilkan oleh program studi. Seminar bereputasi menunjukkan tingkat diseminasi hasil penelitian dalam komunitas ilmiah global.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (26, 'IKU-26', 'Rasio paten/paten sederhana terhadap jumlah penelitian', 'percent', '2026-06-03 17:16:40', '2026-06-03 17:16:40', 'Indikator ini mengukur jumlah paten atau paten sederhana yang dihasilkan dibandingkan dengan total penelitian di program studi. Paten menunjukkan inovasi dan hilirisasi riset, yang berkontribusi pada nilai dampak kegiatan tridharma program studi serta meningkatkan daya saing institusi.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (27, 'IKU-27', 'Rasio program studi yang melaksanakan penelitian kerjasama dengan institusi luar negeri', 'percent', '2026-06-03 17:16:42', '2026-06-03 17:16:42', 'Mengukur jumlah program studi yang memiliki penelitian kolaboratif dengan mitra luar negeri dibandingkan dengan total program studi di institusi. Kolaborasi internasional menunjukkan globalisasi riset dan memperkuat reputasi akademik.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (28, 'IKU-28', 'Rasio program studi yang melaksanakan penelitian tematik', 'percent', '2026-06-03 17:16:45', '2026-06-03 17:16:45', 'Mengindikasikan seberapa banyak program studi yang memiliki penelitian tematik, yaitu penelitian yang sesuai dengan fokus strategis institusi, prioritas nasional, atau tujuan pembangunan berkelanjutan (SDGs). Penelitian ini biasanya terkait dengan bidang unggulan universitas atau kebutuhan masyarakat.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (29, 'IKU-29', 'Rasio program studi yang melaksanakan pengabdian kepada masyarakat tematik', 'percent', '2026-06-03 17:16:47', '2026-06-03 17:16:47', 'Menunjukkan proporsi program studi yang melaksanakan kegiatan pengabdian kepada masyarakat (PKM) tematik, yang sesuai dengan isu strategis nasional atau global, seperti pemberdayaan UMKM, ketahanan Menunjukkan proporsi program studi yang melaksanakan kegiatan pengabdian kepada masyarakat (PKM) tematik, yang sesuai dengan isu strategis nasional atau global, seperti pemberdayaan UMKM, ketahanan pangan, energi terbarukan, atau revolusi industri 4.0.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (30, 'IKU-30', 'Rasio program studi yang melaksanakan pengabdian kepada masyarakat bekerjasama dengan institusi luar negeri', 'percent', '2026-06-03 17:16:48', '2026-06-03 17:16:48', 'Mengukur jumlah program studi yang menyelenggarakan program pengabdian masyarakat di luar negeri, seperti program bantuan teknis, kerja sama dengan komunitas internasional, atau proyek berbasis grant global. Ini memperlihatkan dampak global dari institusi dalam hal kontribusi sosial dan akademik.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (31, 'IKU-31', 'Rasio research group (RG) yang menghasilkan publikasi di jurnal Q1-Q4 atau seminar internasional bereputasi', 'percent', '2026-06-03 17:16:50', '2026-06-03 17:16:50', 'Mengukur efektivitas Research Group (RG) dalam menghasilkan publikasi berkualitas tinggi, baik dalam jurnal Q1-Q4 maupun seminar internasional bereputasi. Rasio ini menunjukkan seberapa produktif dan berkualitas riset yang dilakukan oleh kelompok riset di program studi.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (32, 'IKU-32', 'Rasio research group (RG) yang melaksankaan penelitian berbasis kemitraan atau tematik Collaborative Partnership', 'percent', '2026-06-03 17:16:52', '2026-06-03 17:16:52', 'Mengindikasikan seberapa banyak Research Group (RG) yang melakukan penelitian dengan mitra eksternal (kemitraan) atau sesuai dengan tema prioritas institusi. Semakin tinggi rasio ini, semakin baik keterlibatan RG dalam riset yang berdampak.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (33, 'IKU-33', 'Jumlah peningkatan kerja sama dengan institusi pendidikan', 'count', '2026-06-03 17:16:54', '2026-06-03 17:16:54', 'Menunjukkan adanya peningkatan kolaborasi PENS dengan lembaga pendidikan lain (baik nasional maupun internasional), seperti universitas, politeknik, atau sekolah kejuruan. Bentuk kerjasamanya bisa dalam penelitian bersama, pertukaran dosen/mahasiswa, kurikulum bersama, atau pelatihan bersama. Kenaikan ini mencerminkan jejaring akademik yang semakin kuat dan terbuka.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (34, 'IKU-34', 'Jumlah peningkatan kerja sama dengan institusi non pendidikan', 'count', '2026-06-03 17:16:55', '2026-06-03 17:16:55', 'Menggambarkan meningkatnya kerjasama PENS dengan lembaga di luar dunia pendidikan seperti LSM, pemerintah daerah, rumah sakit, lembaga riset, dan lain-lain. Kolaborasi ini menandakan keterlibatan aktif perguruan tinggi dalam menyelesaikan permasalahan nyata di masyarakat.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (35, 'IKU-35', 'Jumlah peningkatan kerja sama internasional', 'count', '2026-06-03 17:16:57', '2026-06-03 17:16:57', 'Mengindikasikan semakin banyaknya mitra global yang bekerja sama dengan PENS, dalam bentuk proyek riset internasional, publikasi bersama, program pertukaran, atau bentuk kerjasama lainnya. Hal ini memperkuat posisi PENS dalam jaringan global serta meningkatkan daya saing internasional.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (36, 'IKU-36', 'Jumlah peningkatan proyek kerjasama dengan industri', 'count', '2026-06-03 17:17:00', '2026-06-03 17:17:00', 'Menunjukkan pertumbuhan jumlah proyek yang dilakukan bersama mitra industri, baik dalam bentuk riset terapan, uji coba produk, pengembangan teknologi, magang industri, atau bentuk lainnya. Ini mencerminkan kepercayaan industri terhadap kapabilitas PENS dalam mendukung inovasi dan kebutuhan pasar.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (37, 'IKU-37', 'Jumlah peningkatan tenant di inkubator bisnis', 'count', '2026-06-03 17:17:02', '2026-06-03 17:17:02', 'Mewakili meningkatnya jumlah tenant (usaha rintisan/startup) yang difasilitasi dalam inkubator bisnis kampus. Ini mencerminkan peran PENS dalam menumbuhkan wirausaha muda dan ekonomi berbasis inovasi.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (38, 'IKU-38', 'Jumlah peningkatan produk inovatif yang telah dikomersilkan', 'count', '2026-06-03 17:17:03', '2026-06-03 17:17:03', 'Menggambarkan bertambahnya jumlah produk hasil riset PENS yang berhasil dikomersialkan di pasar. Produk ini bisa berupa software, alat kesehatan, aplikasi digital, mesin industri, atau produk lainnya. Indikator ini menandakan keberhasilan hilirisasi hasil riset kampus.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (39, 'IKU-39', 'Jumlah peningkatan perusahaan rintisan (spin-off)', 'count', '2026-06-03 17:17:05', '2026-06-03 17:17:05', 'Menunjukkan jumlah perusahaan baru (spin- off) yang lahir dari civitas akademika PENS, baik oleh dosen, mahasiswa, maupun hasil kolaborasi dengan mitra. Ini memperlihatkan dampak ekonomi langsung dari riset dan inovasi kampus.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (41, 'IKU-41', 'Rasio research group (RG) yang menghasilkan produk inovatif komersial', 'percent', '2026-06-03 17:17:08', '2026-06-03 17:17:08', 'Mengindikasikan berapa banyak RG di PENS yang fokus menciptakan output berupa produk komersial. Ini menunjukkan kemampuan RG untuk menghasilkan solusi nyata dan siap pasar dari kegiatan riset mereka.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (42, 'IKU-42', 'Jumlah peningkatan pendapatan dari sektor pendidikan', 'count', '2026-06-03 17:17:10', '2026-06-03 17:17:10', 'Menggambarkan pertumbuhan pendapatan PENS yang bersumber dari kegiatan pendidikan, seperti tuition fee program reguler dan non-reguler, pelatihan bersertifikat, dan program studi internasional. Peningkatan ini menunjukkan keberhasilan PENS dalam diversifikasi layanan pendidikan.', NULL, NULL);
INSERT INTO "indicators" ("id", "code", "description", "data_type", "created_at", "updated_at", "formula", "numerator_label", "denominator_label") VALUES (43, 'IKU-43', 'Jumlah peningkatan pendapatan dari sektor non pendidikan', 'count', '2026-06-03 17:17:12', '2026-06-03 17:17:12', 'Mencakup peningkatan pendapatan dari sumber non-akademik, seperti lisensi teknologi, hasil kerja sama industri, royalti, inkubator bisnis, serta penyewaan fasilitas. Ini menjadi indikator kemandirian PENS dari sisi finansial.', NULL, NULL);

-- --------------------------------------------------------
-- Table structure for table "indicator_targets"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "indicator_targets" CASCADE;

CREATE TABLE "indicator_targets" (
    "id" BIGINT NOT NULL DEFAULT nextval('indicator_targets_id_seq'::regclass),
    "indicator_id" BIGINT NOT NULL,
    "year" INTEGER NOT NULL,
    "target_value" NUMERIC NOT NULL DEFAULT '0'::numeric,
    "created_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY ("id")
);

-- Dumping data for table "indicator_targets"
-- (No data)

-- --------------------------------------------------------
-- Table structure for table "research_groups"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "research_groups" CASCADE;

CREATE TABLE "research_groups" (
    "id" BIGINT NOT NULL DEFAULT nextval('research_groups_id_seq'::regclass),
    "name" CHARACTER VARYING(255) NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY ("id")
);

-- Dumping data for table "research_groups"
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (1, 'Biosignal and Medical Instrumentation', '2026-06-03 17:15:16', '2026-06-03 17:15:16');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (2, 'Intelligent Control & Robotics', '2026-06-03 17:15:17', '2026-06-03 17:15:17');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (3, 'Embedded Artificial Intelligent System', '2026-06-03 17:15:17', '2026-06-03 17:15:17');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (4, 'Aquacultural Engineering Applied Technology', '2026-06-03 17:15:18', '2026-06-03 17:15:18');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (5, 'Smart Sensors-Devices and Applied Systems', '2026-06-03 17:15:18', '2026-06-03 17:15:18');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (6, 'Optimal Technologies for Instrumentation-Sensor-Circuit-Control System Design', '2026-06-03 17:15:19', '2026-06-03 17:15:19');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (7, 'Telecommunication Support Technology for Easy Mobility (Tasty) Research Group', '2026-06-03 17:15:19', '2026-06-03 17:15:19');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (8, 'Wireless Communication Research Group', '2026-06-03 17:15:20', '2026-06-03 17:15:20');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (9, 'Mobile Network and Pervasive Computing', '2026-06-03 17:15:20', '2026-06-03 17:15:20');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (10, 'Underwater Vehicle and Communication', '2026-06-03 17:15:21', '2026-06-03 17:15:21');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (11, 'Telecommunication Signal Processing', '2026-06-03 17:15:21', '2026-06-03 17:15:21');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (12, 'Mobile Communication and Security', '2026-06-03 17:15:22', '2026-06-03 17:15:22');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (13, 'Smart Grid Technology', '2026-06-03 17:15:22', '2026-06-03 17:15:22');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (14, 'High Voltage And Energy Storage', '2026-06-03 17:15:22', '2026-06-03 17:15:22');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (15, 'Green Energy Transportation & Applications', '2026-06-03 17:15:23', '2026-06-03 17:15:23');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (16, 'Power Electronics for Energy Conservation', '2026-06-03 17:15:23', '2026-06-03 17:15:23');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (17, 'Power Quality and Applied Control', '2026-06-03 17:15:24', '2026-06-03 17:15:24');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (18, 'Intelligent System Applications for Power System (ISAP)', '2026-06-03 17:15:24', '2026-06-03 17:15:24');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (19, 'T ROVIAP (Robotic Vehicle and Its Applications)', '2026-06-03 17:15:25', '2026-06-03 17:15:25');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (20, 'Intelligent Mechatronics & Robotics', '2026-06-03 17:15:25', '2026-06-03 17:15:25');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (21, 'Sensor Fusion', '2026-06-03 17:15:26', '2026-06-03 17:15:26');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (22, 'Kontrol Mekatronika', '2026-06-03 17:15:26', '2026-06-03 17:15:26');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (23, 'Thermal Engineering', '2026-06-03 17:15:27', '2026-06-03 17:15:27');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (24, 'Marine Energy Conversion', '2026-06-03 17:15:27', '2026-06-03 17:15:27');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (25, 'Bio-Electrochemical System', '2026-06-03 17:15:28', '2026-06-03 17:15:28');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (26, 'Green Electrification', '2026-06-03 17:15:28', '2026-06-03 17:15:28');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (27, 'Data Centric Artificial Intelligent and e-Business System', '2026-06-03 17:15:29', '2026-06-03 17:15:29');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (28, 'Health Informatics', '2026-06-03 17:15:29', '2026-06-03 17:15:29');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (29, 'Agile Product Development', '2026-06-03 17:15:30', '2026-06-03 17:15:30');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (30, 'Network and Cyber Security', '2026-06-03 17:15:30', '2026-06-03 17:15:30');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (31, 'Knowledge Engineering (Knowing)', '2026-06-03 17:15:31', '2026-06-03 17:15:31');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (32, 'Mobile Sensing & Edge Computing Technology (MSECT)', '2026-06-03 17:15:31', '2026-06-03 17:15:31');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (33, 'Pervasive Computing', '2026-06-03 17:15:32', '2026-06-03 17:15:32');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (34, 'Industrial Robotic and IoT (IRIT)', '2026-06-03 17:15:32', '2026-06-03 17:15:32');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (35, 'Health and Bio Engineering (HeBring)', '2026-06-03 17:15:33', '2026-06-03 17:15:33');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (36, 'Cyber-Physical Systems', '2026-06-03 17:15:33', '2026-06-03 17:15:33');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (37, 'Social Robotics and Smart System Applications', '2026-06-03 17:15:34', '2026-06-03 17:15:34');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (38, 'Digital Media', '2026-06-03 17:15:34', '2026-06-03 17:15:34');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (39, 'Multimedia Imaging', '2026-06-03 17:15:35', '2026-06-03 17:15:35');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (40, 'Edutainment Computing', '2026-06-03 17:15:35', '2026-06-03 17:15:35');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (41, 'Game For Education And Cultural Heritage (Game Edu)', '2026-06-03 17:15:36', '2026-06-03 17:15:36');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (42, 'Serious Game (SEGA)', '2026-06-03 17:15:36', '2026-06-03 17:15:36');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (43, 'Multimedia Interaktif dan Animasi', '2026-06-03 17:15:37', '2026-06-03 17:15:37');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (44, 'Human Centric Multimedia', '2026-06-03 17:15:37', '2026-06-03 17:15:37');
INSERT INTO "research_groups" ("id", "name", "created_at", "updated_at") VALUES (45, 'Data Science for SDG''s Applied Solutions', '2026-06-03 17:15:38', '2026-06-03 17:15:38');

-- --------------------------------------------------------
-- Table structure for table "indicator_achievements"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "indicator_achievements" CASCADE;

CREATE TABLE "indicator_achievements" (
    "id" BIGINT NOT NULL DEFAULT nextval('indicator_achievements_id_seq'::regclass),
    "indicator_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "year" INTEGER NOT NULL,
    "value" NUMERIC NOT NULL DEFAULT '0'::numeric,
    "status" CHARACTER VARYING(255) NOT NULL DEFAULT 'draft'::character varying,
    "verified_by" BIGINT,
    "created_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    "proof_path" CHARACTER VARYING(255),
    "description" TEXT,
    "is_read" BOOLEAN NOT NULL DEFAULT true,
    "status_changed_at" TIMESTAMP WITHOUT TIME ZONE,
    "rejection_reason" TEXT,
    "is_read_wadir" BOOLEAN NOT NULL DEFAULT true,
    "is_read_direktur" BOOLEAN NOT NULL DEFAULT true,
    "numerator_value" DOUBLE PRECISION,
    "denominator_value" DOUBLE PRECISION,
    "research_group_id" BIGINT,
    PRIMARY KEY ("id")
);

-- Dumping data for table "indicator_achievements"
-- (No data)

-- --------------------------------------------------------
-- Table structure for table "indicator_pics"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "indicator_pics" CASCADE;

CREATE TABLE "indicator_pics" (
    "id" BIGINT NOT NULL DEFAULT nextval('indicator_pics_id_seq'::regclass),
    "indicator_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE,
    "updated_at" TIMESTAMP WITHOUT TIME ZONE,
    PRIMARY KEY ("id")
);

-- Dumping data for table "indicator_pics"
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (1, 1, 7, '2026-06-03 17:15:45', '2026-06-03 17:15:45');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (2, 2, 7, '2026-06-03 17:15:46', '2026-06-03 17:15:46');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (3, 3, 8, '2026-06-03 17:15:49', '2026-06-03 17:15:49');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (4, 4, 9, '2026-06-03 17:15:51', '2026-06-03 17:15:51');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (5, 5, 10, '2026-06-03 17:15:53', '2026-06-03 17:15:53');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (6, 6, 10, '2026-06-03 17:15:55', '2026-06-03 17:15:55');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (7, 7, 11, '2026-06-03 17:15:57', '2026-06-03 17:15:57');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (8, 8, 11, '2026-06-03 17:15:59', '2026-06-03 17:15:59');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (9, 9, 12, '2026-06-03 17:16:01', '2026-06-03 17:16:01');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (10, 10, 12, '2026-06-03 17:16:03', '2026-06-03 17:16:03');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (11, 11, 12, '2026-06-03 17:16:04', '2026-06-03 17:16:04');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (12, 12, 12, '2026-06-03 17:16:06', '2026-06-03 17:16:06');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (13, 13, 7, '2026-06-03 17:16:08', '2026-06-03 17:16:08');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (14, 13, 13, '2026-06-03 17:16:10', '2026-06-03 17:16:10');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (15, 14, 7, '2026-06-03 17:16:11', '2026-06-03 17:16:11');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (16, 14, 14, '2026-06-03 17:16:13', '2026-06-03 17:16:13');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (17, 15, 7, '2026-06-03 17:16:15', '2026-06-03 17:16:15');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (18, 15, 15, '2026-06-03 17:16:17', '2026-06-03 17:16:17');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (19, 16, 7, '2026-06-03 17:16:18', '2026-06-03 17:16:18');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (20, 16, 14, '2026-06-03 17:16:20', '2026-06-03 17:16:20');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (21, 17, 7, '2026-06-03 17:16:21', '2026-06-03 17:16:21');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (22, 17, 14, '2026-06-03 17:16:22', '2026-06-03 17:16:22');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (23, 18, 12, '2026-06-03 17:16:24', '2026-06-03 17:16:24');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (24, 18, 14, '2026-06-03 17:16:25', '2026-06-03 17:16:25');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (25, 19, 16, '2026-06-03 17:16:27', '2026-06-03 17:16:27');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (26, 19, 12, '2026-06-03 17:16:29', '2026-06-03 17:16:29');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (27, 20, 12, '2026-06-03 17:16:30', '2026-06-03 17:16:30');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (28, 21, 12, '2026-06-03 17:16:32', '2026-06-03 17:16:32');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (29, 22, 10, '2026-06-03 17:16:34', '2026-06-03 17:16:34');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (30, 23, 14, '2026-06-03 17:16:35', '2026-06-03 17:16:35');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (31, 23, 15, '2026-06-03 17:16:37', '2026-06-03 17:16:37');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (32, 24, 14, '2026-06-03 17:16:38', '2026-06-03 17:16:38');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (33, 25, 14, '2026-06-03 17:16:40', '2026-06-03 17:16:40');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (34, 26, 14, '2026-06-03 17:16:42', '2026-06-03 17:16:42');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (35, 27, 7, '2026-06-03 17:16:43', '2026-06-03 17:16:43');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (36, 27, 14, '2026-06-03 17:16:44', '2026-06-03 17:16:44');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (37, 28, 14, '2026-06-03 17:16:46', '2026-06-03 17:16:46');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (38, 29, 14, '2026-06-03 17:16:48', '2026-06-03 17:16:48');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (39, 30, 14, '2026-06-03 17:16:50', '2026-06-03 17:16:50');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (40, 31, 14, '2026-06-03 17:16:51', '2026-06-03 17:16:51');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (41, 32, 14, '2026-06-03 17:16:53', '2026-06-03 17:16:53');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (42, 33, 15, '2026-06-03 17:16:55', '2026-06-03 17:16:55');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (43, 34, 15, '2026-06-03 17:16:57', '2026-06-03 17:16:57');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (44, 35, 9, '2026-06-03 17:16:58', '2026-06-03 17:16:58');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (45, 35, 15, '2026-06-03 17:17:00', '2026-06-03 17:17:00');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (46, 36, 15, '2026-06-03 17:17:01', '2026-06-03 17:17:01');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (47, 37, 15, '2026-06-03 17:17:03', '2026-06-03 17:17:03');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (48, 38, 14, '2026-06-03 17:17:05', '2026-06-03 17:17:05');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (49, 39, 15, '2026-06-03 17:17:06', '2026-06-03 17:17:06');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (50, 40, 14, '2026-06-03 17:17:08', '2026-06-03 17:17:08');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (51, 41, 14, '2026-06-03 17:17:10', '2026-06-03 17:17:10');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (52, 42, 17, '2026-06-03 17:17:12', '2026-06-03 17:17:12');
INSERT INTO "indicator_pics" ("id", "indicator_id", "user_id", "created_at", "updated_at") VALUES (53, 43, 17, '2026-06-03 17:17:13', '2026-06-03 17:17:13');

-- --------------------------------------------------------
-- Table structure for table "migrations"
-- --------------------------------------------------------

DROP TABLE IF EXISTS "migrations" CASCADE;

CREATE TABLE "migrations" (
    "id" INTEGER NOT NULL DEFAULT nextval('migrations_id_seq'::regclass),
    "migration" CHARACTER VARYING(255) NOT NULL,
    "batch" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

-- Dumping data for table "migrations"
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (4, '2026_03_18_101958_create_indicators_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (5, '2026_03_18_101959_create_indicator_targets_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (6, '2026_03_18_102000_create_indicator_achievements_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (7, '2026_03_18_102000_create_indicator_pics_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (8, '2026_03_22_154411_add_proof_and_description_to_indicator_achievements_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (9, '2026_03_28_111659_add_formula_to_indicators_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (10, '2026_03_28_111700_create_units_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (11, '2026_03_28_111723_add_unit_id_to_users_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (12, '2026_03_28_182328_add_is_read_to_indicator_achievements_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (13, '2026_03_28_184336_add_rejection_reason_to_indicator_achievements_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (14, '2026_03_28_190745_add_read_flags_for_wadir_direktur_to_indicator_achievements_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (15, '2026_03_30_104610_add_smart_fields_to_indicators_and_achievements', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (16, '2026_06_04_000000_create_research_groups_table', 1);
INSERT INTO "migrations" ("id", "migration", "batch") VALUES (17, '2026_06_04_000001_add_research_group_id_to_indicator_achievements_table', 1);

