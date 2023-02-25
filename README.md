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

|   Name   |  Status  |         |
| :------: | :------: | :-----: |
|   nik    | Required | Integer |
|   nama   | Required | String  |
| password | Required | String  |


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

