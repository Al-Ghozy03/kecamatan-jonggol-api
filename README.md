# Sipaojol

# Usage

1. Clone this repository

```markdown
https://github.com/Al-Ghozy03/sistem-informasi-desa.git
```

2. run `npm install`
3. Create `.env` file, and then copy this code below

```dotenv
PORT = 8000
JWT_SIGN = 9AJ8YUDSTHT76r65t5rtyghbjkhbjgvftryuyi

NODE_ENV = development

# mysql
DB_USERNAME = root
DB_PASSWORD =
DB_DEV = kecamatan-jonggol
DB_HOST = 127.0.0.1
DB_DIALECT = mysql

# cloudinary
CLOUD_NAME = mypro
API_KEY = 661773253267258
SECRET_API_KEY = jD8-FRGTSVVmD3MZL1160kqm4Dk
```

4. run `npm start`

# Documentation

**BASE URL = http://localhost:8000/api**

## Auth

#### Authme

```markdown
/auth/authme
```

**Method : GET**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Penduduk

#### Login

```markdown
/penduduk/login
```

**Method : POST**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|   Name   |  Status  |         |
| :------: | :------: | :-----: |
|   nik    | Required | Integer |
| password | Required | String  |

#### Register

```markdown
/penduduk/register
```

**Method : POST**

Body

|   Name   |  Status  |         |
| :------: | :------: | :-----: |
|   nik    | Required | Integer |
|   nama   | Required | String  |
| password | Required | String  |
| id_desa  | Required | Integer |
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Total Penduduk

```markdown
/penduduk
```

**Method : GET**

#### List (Admin only)

```markdown
/penduduk
```

**Method : GET**

Params

| Name  |  Status  |         |                        |
| :---: | :------: | :-----: | :--------------------: |
| page  | Optional | Integer |                        |
| limit | Optional | Integer |                        |
|  key  | Optional | String  | Search by nama and NIK |

#### Detail

```markdown
/penduduk/[slug]
```

**Method : GET**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit

```markdown
/penduduk/edit/[slug]
```

**Method : PUT**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|            Name            |  Status  |                                                                        |
| :------------------------: | :------: | :--------------------------------------------------------------------: |
|            nama            | Optional |                                 String                                 |
|           no_hp            | Optional |                                Integer                                 |
|            nik             | Optional |                                Integer                                 |
|           alamat           | Required |                                 String                                 |
|             rt             | Required |                                 String                                 |
|             rw             | Required |                                 String                                 |
|           dusun            | Required |                                 String                                 |
|          nomor_kk          | Required |                                Integer                                 |
|          password          | Optional |                                 String                                 |
|       jenis_kelamin        | Required |                                 String                                 |
|        tempat_lahir        | Required |                                 String                                 |
|       tanggal_lahir        | Required |                                  Date                                  |
|           agama            | Required |                                 String                                 |
|    pendidikan_dalam_kk     | Required |                                 String                                 |
| pendidikan_sedang_ditempuh | Required |                                 String                                 |
|         pekerjaan          | Required |                                 String                                 |
|           kawin            | Required |                                 String                                 |
|     hubungan_keluarga      | Required |                                 String                                 |
|      kewarganegaraan       | Required |                                 String                                 |
|         nama_ayah          | Required |                                 String                                 |
|          nama_ibu          | Required |                                 String                                 |
|          nik_ayah          | Required |                                Integer                                 |
|          nik_ibu           | Required |                                Integer                                 |
|       golongan_darah       | Required | "A","B","AB","O","A+","A-","B+","B-","AB+","AB-","O+","O-","TIDAKTAHU" |
|         akta_lahir         | Required |                                 String                                 |
|   nomor_dokumen_passpor    | Required |                                 String                                 |
|   tanggal_akhir_passport   | Required |                                  Date                                  |
|    nomor_dokumen_KITAS     | Required |                                 String                                 |
|   nomor_akta_perkawinan    | Required |                                 String                                 |
|     tanggal_perkawinan     | Required |                                  Date                                  |
|      nomor_akta_cerai      | Required |                                Integer                                 |
|     tanggal_perceraian     | Required |                                  Date                                  |
|           cacat            | Required |                                 String                                 |
|          cara_kb           | Required |                                 String                                 |
|           hamil            | Required |                                 String                                 |
|      alamat_sekarang       | Required |                                 String                                 |
|          desa_id           | Required |                                Integer                                 |

## Admin

#### Login

```markdown
/admin/login
```

**Method : POST**

Body

|   Name   |  Status  |        |
| :------: | :------: | :----: |
|  email   | Required | String |
| password | Required | String |
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Register (Only administrator)

```markdown
/admin/register
```

Note : **Admin is added by administrator** <br/>
**Method : POST**

Body

|   Name   |  Status  |         |
| :------: | :------: | :-----: |
|  email   | Required | String  |
| password | Required | String  |
| id_role  | Required | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List (Only admin)

```markdown
/admin
```

**Method : GET**

Params

| Name  |  Status  |         |                 |
| :---: | :------: | :-----: | :-------------: |
| page  | Optional | Integer |                 |
| limit | Optional | Integer |                 |
|  key  | Optional | String  | Search by email |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Layanan

#### Create (Only admin)

```markdown
/layanan/create
```

**Method : POST**

Body

|   Name   |  Status  |                         |
| :------: | :------: | :---------------------: |
|   nama   | Required |         String          |
|  syarat  | Required | Array convert to String |
| template | Required |          file           |

Headers

|     Name      |  Status  |                     |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### Edit (Only admin)

```markdown
/layanan/edit/[id]
```

**Method : PUT**

Body

|   Name   |  Status  |                         |
| :------: | :------: | :---------------------: |
|   nama   | Required |         String          |
|  syarat  | Required | Array convert to String |
| template | Required |          file           |

Headers

|     Name      |  Status  |                     |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### List

```markdown
/layanan
```

**Method : GET**

Params

| Name  |  Status  |         |                |
| :---: | :------: | :-----: | :------------: |
| page  | Optional | Integer |                |
| limit | Optional | Integer |                |
|  key  | Optional | String  | Search by nama |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Detail

```markdown
/layanan/[slug]
```

**Method : GET**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Only admin)

```markdown
/layanan/delete/[id]
```

**Method : DELETE**

<!-- ## Surat

#### Create

```markdown
/surat/create
```

**Method : POST**

Body

|    Name    |  Status  |         |
| :--------: | :------: | :-----: |
| id_layanan | Required | Integer |

#### Edit (Only admin)

```markdown
/surat/edit/[id]
```

**Method : PUT**

Body

|  Name  |  Status  |                                    |
| :----: | :------: | :--------------------------------: |
| status | Required | "verifikasi", "diterima","ditolak" |

#### List

```markdown
/surat
```

**Method : GET**

Params

|    Name     |  Status  |         |                         |
| :---------: | :------: | :-----: | :---------------------: |
|    page     | Optional | Integer |                         |
|    limit    | Optional | Integer |                         |
|   status    | Optional | String  |    Search by status     |
| nomor_surat | Optional | String  |  Search by nomor_surat  |
|    bulan    | Optional | String  |     Search by bulan     |
|    tahun    | Optional | String  |     Search by tahun     |
|    nama     | Optional | String  | Search by nama penduduk |
|   layanan   | Optional | String  |    Search by layanan    |
|    desa     | Optional | String  |     Search by desa      | -->

## Berita

#### Create (Admin only)

```markdown
/berita/create
```

**Method : POST**

Body

|   Name    |  Status  |        |
| :-------: | :------: | :----: |
|   judul   | Required | String |
|  konten   | Required | String |
| thumbnail | Required |  File  |

Headers

|     Name      |  Status  |                     |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### Edit (Admin only)

```markdown
/berita/edit/[slug]
```

**Method : PUT**

Body

|   Name    |  Status  |        |
| :-------: | :------: | :----: |
|   judul   | Optional | String |
|  konten   | Optional | String |
| thumbnail | Optional |  File  |

Headers

|     Name      |  Status  |                     |
| :-----------: | :------: | :-----------------: |
| Content-Type  | Required | multipart/form-data |
| Authorization | Required |       String        |

#### Delete (Admin only)

```markdown
/berita/delete/[slug]
```

**Method : DELETE**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/berita
```

**Method : GET**

Params

| Name  |  Status  |         |                 |
| :---: | :------: | :-----: | :-------------: |
| page  | Optional | Integer |                 |
| limit | Optional | Integer |                 |
|  key  | Optional | String  | Search by judul |

#### Detail

```markdown
/berita/[slug]
```

**Method : GET**

## Action

#### Create (Admin only)

```markdown
/action/create
```

**Method : POST**

Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
| action_name | Required | String |
| description | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/action/edit/[id]
```

**Method : PUT**

Body

|    Name     |  Status  |        |
| :---------: | :------: | :----: |
| action_name | Optional | String |
| description | Optional | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/action/delete/[id]
```

**Method : DELETE**

#### List (Admin only)

```markdown
/action
```

**Method : GET**

Params

| Name  |  Status  |         |                       |
| :---: | :------: | :-----: | :-------------------: |
| page  | Optional | Integer |                       |
| limit | Optional | Integer |                       |
|  key  | Optional | String  | Search by action_name |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Role

#### Create (Admin only)

```markdown
/role/create
```

**Method : POST**

Body

|   Name    |  Status  |        |
| :-------: | :------: | :----: |
| role_name | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/role/edit/[id]
```

**Method : PUT**

Body

|   Name    |  Status  |        |
| :-------: | :------: | :----: |
| role_name | Optional | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/role/delete/[id]
```

**Method : DELETE**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List (Admin only)

```markdown
/role
```

**Method : GET**

Params

| Name  |  Status  |         |                       |
| :---: | :------: | :-----: | :-------------------: |
| page  | Optional | Integer |                       |
| limit | Optional | Integer |                       |
|  key  | Optional | String  | Search by action_name |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Role Action

#### Create (Admin only)

```markdown
/role-action/create
```

**Method : POST**

Body

|   Name    |  Status  |         |
| :-------: | :------: | :-----: |
|  id_role  | Required | Integer |
| id_action | Required | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/role-action/edit/[id]
```

**Method : PUT**

Body

|   Name    |  Status  |         |
| :-------: | :------: | :-----: |
|  id_role  | Required | Integer |
| id_action | Required | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/role-action/delete/[id]
```

**Method : DELETE**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List (Admin only)

```markdown
/role-action
```

**Method : GET**

Params

| Name  |  Status  |         |
| :---: | :------: | :-----: |
| page  | Optional | Integer |
| limit | Optional | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

## Desa

#### Create (Admin only)

```markdown
/desa/create
```

**Method : POST**

Body

|    Name    |  Status  |        |
| :--------: | :------: | :----: |
|    nama    | Required | String |
| longtitude | Required | String |
|  latitude  | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/desa/edit/[id]
```

**Method : PUT**

Body

|    Name    |  Status  |        |
| :--------: | :------: | :----: |
|    nama    | Optional | String |
| longtitude | Optional | String |
|  latitude  | Optional | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/desa/delete/[id]
```

**Method : DELETE**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/desa
```

**Method : GET**

## Tentang

#### Create (Admin only)

```markdown
/tentang/create
```

**Method : POST**

Body

|   Name    |  Status  |        |
| :-------: | :------: | :----: |
| deskripsi | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/tentang/edit/1
```

**Method : PUT**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|   Name    |  Status  |        |
| :-------: | :------: | :----: |
| deskripsi | Optional | String |

#### List

```markdown
/tentang
```

**Method : GET**

## Album

#### Create (Admin only)

```markdown
/album/create
```

**Method : POST**

Body

|    Name    |  Status  |        |
| :--------: | :------: | :----: |
| nama_album | Required | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/album/edit/[slug]
```

**Method : PUT**

Body

|    Name    |  Status  |        |
| :--------: | :------: | :----: |
| nama_album | Optional | String |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/album/delete/[slug]
```

**Method : DELETE**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### List

```markdown
/album
```

**Method : GET**

## Galeri

#### Create (Admin only)

```markdown
/galeri/create
```

**Method : POST**

Body

|   Name    |  Status  |         |
| :-------: | :------: | :-----: |
| id_album  | Required | Integer |
|   nama    | Required | String  |
| deskripsi | Required | String  |
| thumbnail | Required |  File   |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Admin only)

```markdown
/galeri/edit/[slug]
```

**Method : PUT**
Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|   Name    |  Status  |         |
| :-------: | :------: | :-----: |
| id_album  | Optional | Integer |
|   nama    | Optional | String  |
| deskripsi | Optional | String  |
| thumbnail | Optional |  File   |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Delete (Admin only)

```markdown
/galeri/delete/[slug]
```

**Method : DELETE**

#### List

```markdown
/galeri
```

**Method : GET**

#### Detail

```markdown
/galeri/[slug]
```

**Method : GET**
