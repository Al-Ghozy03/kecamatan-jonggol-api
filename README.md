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

Response

**_Status code 200_**

```json
{
  "code": 200,
  "message": "success",
}
```

**_Status code 404_**

```json
{
  "code": 404,
  "message": "NIK tidak ditemukan"
}
```

**_Status code 500_**

```json
{
  "code": 500,
  "message": "password salah"
}
```

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

Response

**_Status code 200_**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "nama": "someone"
  },
}
```

**_Status code 500_**

```json
{
  "code": 500,
  "message": "NIK sudah terdaftar"
}
```

#### List

```markdown
/penduduk
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

Response

**_Status code 200_**

```json
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "id": "cf1aad78de28ce60f0eb1a557f0cd059",
      "nama": "naruto",
      "rt": null,
      "rw": null,
      "dusun": null,
      "nomor_kk": null,
      "nik": "0891576864906",
      "jenis_kelamin": null,
      "tempat_lahir": null,
      "tanggal_lahir": null,
      "agama": null,
      "pendidikan_dalam_kk": null,
      "pendidikan_sedang_ditempuh": null,
      "pekerjaan": null,
      "kawin": null,
      "hubungan_keluarga": null,
      ...
    },
  ]
}
```

**_Status code 500_**

```json
{
  "code": 500,
  "message": "error message",
  "data": null
}
```

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

Response

**_Status code 200_**

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": "cf1aad78de28ce60f0eb1a557f0cd059",
    "nama": "kakashi",
    "rt": null,
    "rw": null,
    "dusun": null,
    "nomor_kk": null,
   ...
  }
}
```

**_Status code 404_**

```json
{
  "code": 404,
  "message": "data tidak ditemukan",
  "data": null
}
```

**_Status code 500_**

```json
{
  "code": 500,
  "message": "error message",
  "data": null
}
```

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

Response

**_Status code 200_**

```json
{
  "code": 200,
  "message": "success"
}
```

**_Status code 404_**

```json
{
  "code": 404,
  "message": "data tidak ditemukan",
  "data": null
}
```

**_Status code 404_**

```json
{
  "code": 422,
  "message": "data tidak ditemukan"
}
```

**_Status code 500_**

```json
{
  "code": 422,
  "message": "failed",
  "error": {
    "dusun": {
      "msg": "dusun tidak boleh kosong",
      "param": "dusun",
      "location": "body"
    },
    "nomor_kk": {
      "msg": "nomor kk tidak boleh kosong",
      "param": "nomor_kk",
      "location": "body"
    },
    "jenis_kelamin": {
      "msg": "jenis kelamin tidak boleh kosong",
      "param": "jenis_kelamin",
      "location": "body"
    }
    ...
  }
}
```
