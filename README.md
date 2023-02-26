# Sipaojol

# Usage

1. Clone this repository

```markdown
https://github.com/Al-Ghozy03/sistem-informasi-desa.git
```

2. run `npm install`
3. run `npm start`

# Documentation

**BASE URL = http://localhost:8000/api**

## Penduduk

#### Login

```markdown
/penduduk/login
```

**Method : POST**

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

|   Name   |  Status  |          |
| :------: | :------: | :------: |
|   nik    | Required | Integer  |
|   nama   | Required |  String  |
| password | Required |  String  |
| id_desa  | Required | Mongo ID |

#### List

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

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Detail

```markdown
/penduduk/[id]
```

**Method : GET**

Params

| Name |  Status  |         |
| :--: | :------: | :-----: |
|  id  | Required | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit

```markdown
/penduduk/edit/[id]
```

**Method : PUT**

Params

| Name |  Status  |         |
| :--: | :------: | :-----: |
|  id  | Required | Integer |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

Body

|            Name            |  Status  |                                                                        |
| :------------------------: | :------: | :--------------------------------------------------------------------: |
|            nama            | Optional |                                 String                                 |
|            nik             | Optional |                                Integer                                 |
|           alamat           | Required |                                 String                                 |
|             rt             | Required |                                 String                                 |
|             rw             | Required |                                 String                                 |
|           dusun            | Required |                                 String                                 |
|          nomor_kk          | Required |                                Integer                                 |
|          password          | Optional |                                Integer                                 |
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

#### Register (Only administrator)

```markdown
/admin/register
```

Note : **Admin is added by administrator** <br/>
**Method : POST**

Body

|   Name   |  Status  |          |
| :------: | :------: | :------: |
|  email   | Required |  String  |
| password | Required |  String  |
| id_role  | Required | Mongo ID |

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
| Authorization | Required |       String        |
| Content-Type  | Required | multipart/form-data |

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
| Authorization | Required |       String        |
| Content-Type  | Required | multipart/form-data |

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

#### Delete (Only admin)

```markdown
/layanan/delete/[id]
```

**Method : DELETE**

## Surat

#### Create

```markdown
/surat/create
```

**Method : POST**

Body

|    Name    |  Status  |          |
| :--------: | :------: | :------: |
| id_layanan | Required | Mongo ID |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Edit (Only admin)

```markdown
/surat/edit/[id]
```

**Method : PUT**

Body

|  Name  |  Status  |                                    |
| :----: | :------: | :--------------------------------: |
| status | Required | "verifikasi", "diterima","ditolak" |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

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
|    desa     | Optional | String  |     Search by desa      |

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

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
| Authorization | Required |       String        |
| Content-Type  | Required | multipart/form-data |

#### Edit (Admin only)

```markdown
/berita/edit/[id]
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
| Authorization | Required |       String        |
| Content-Type  | Required | multipart/form-data |

#### Delete (Admin only)

```markdown
/berita/delete/[id]
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

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

#### Detail

```markdown
/berita/[id]
```

**Method : GET**

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

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

Headers

|     Name      |  Status  |        |
| :-----------: | :------: | :----: |
| Authorization | Required | String |

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
