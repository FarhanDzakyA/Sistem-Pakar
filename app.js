document.addEventListener("DOMContentLoaded", function () {
    // Dataset untuk setiap gejala yang ada
    const gejalaDataset = [
        { id: "G001", gejala: "Tidak berminyak" },
        { id: "G002", gejala: "Segar dan halus" },
        { id: "G003", gejala: "Bahan-bahan kosmetik mudah menempel di kulit." },
        { id: "G004", gejala: "Terlihat sehat" },
        { id: "G005", gejala: "Tidak berjerawat" },
        { id: "G006", gejala: "Mudah dalam memilih kosmetik." },
        { id: "G007", gejala: "Pori-pori kulit besar terutama di area hidung, pipi, dagu" },
        { id: "G008", gejala: "Kulit di bagian wajah terlihat mengkilat" },
        { id: "G009", gejala: "Sering ditumbuhi jerawat" },
        { id: "G010", gejala: "Kulit kelihatan kering sekali" },
        { id: "G011", gejala: "Pori-pori halus" },
        { id: "G012", gejala: "Tekstur kulit wajah tipis" },
        { id: "G013", gejala: "Cepat menampakkan kerutan-kerutan" },
        { id: "G014", gejala: "Sebagian kulit kelihatan berminyak" },
        { id: "G015", gejala: "Sebagian kulit kelihatan kering" },
        { id: "G016", gejala: "Kadang berjerawat" },
        { id: "G017", gejala: "Susah mendapat hasil polesan kosmetik yang sempurna" },
        { id: "G018", gejala: "Mudah alergi" },
        { id: "G019", gejala: "Mudah iritasi dan terluka" },
        { id: "G020", gejala: "Kulit mudah terlihat kemerahan." }
    ];

    // Dataset nilai CF untuk input user
    const cfInput = [
        { kondisi: "Tidak Tahu", cf: 0 },
        { kondisi: "Kemungkinan", cf: 0.4 },
        { kondisi: "Kemungkinan Besar", cf: 0.6 },
        { kondisi: "Hampir Pasti", cf: 0.8 },
        { kondisi: "Pasti", cf: 1 }
    ];

    // Dataset pembobotan gejala
    const pembobotanGejala = {
        normal: [
            { id: "G001", gejala: "Tidak berminyak", bobot: 0.8 },
            { id: "G002", gejala: "Segar dan halus", bobot: 0.8 },
            { id: "G003", gejala: "Bahan-bahan kosmetik mudah menempel di kulit.", bobot: 0.8 },
            { id: "G004", gejala: "Terlihat sehat", bobot: 0.8 },
            { id: "G005", gejala: "Tidak berjerawat", bobot: 0.8 },
            { id: "G006", gejala: "Mudah dalam memilih kosmetik.", bobot: 0.8 },
            { id: "G011", gejala: "Pori-pori halus", bobot: 0.8 }
        ],
        berminyak: [
            { id: "G007", gejala: "Pori-pori kulit besar terutama di area hidung, pipi, dagu", bobot: 0.8 },
            { id: "G008", gejala: "Kulit di bagian wajah terlihat mengkilat", bobot: 0.8 },
            { id: "G009", gejala: "Sering ditumbuhi jerawat", bobot: 0.8 },
            { id: "G016", gejala: "Kadang berjerawat", bobot: 0.8 }
        ],
        kering: [
            { id: "G001", gejala: "Tidak berminyak", bobot: 0.6 },
            { id: "G005", gejala: "Tidak berjerawat", bobot: 0.6 },
            { id: "G010", gejala: "Kulit kelihatan kering sekali", bobot: 0.8 },
            { id: "G011", gejala: "Pori-pori halus", bobot: 0.6 },
            { id: "G012", gejala: "Tekstur kulit wajah tipis", bobot: 0.6 }
        ],
        kombinasi: [
            { id: "G007", gejala: "Pori-pori kulit besar terutama di area hidung, pipi, dagu", bobot: 0.6 },
            { id: "G014", gejala: "Sebagian kulit kelihatan berminyak", bobot: 0.4 },
            { id: "G015", gejala: "Sebagian kulit kelihatan kering", bobot: 0.6 },
            { id: "G016", gejala: "Kadang berjerawat", bobot: 0.4 },
            { id: "G017", gejala: "Susah mendapat hasil polesan kosmetik yang sempurna", bobot: 0.6 }
        ],
        sensitif: [
            { id: "G012", gejala: "Tekstur kulit wajah tipis", bobot: 0.8 },
            { id: "G018", gejala: "Mudah alergi", bobot: 0.8 },
            { id: "G019", gejala: "Mudah iritasi dan terluka", bobot: 0.8 },
            { id: "G020", gejala: "Kulit mudah terlihat kemerahan", bobot: 0.8 }
        ]
    };

    // Dataset solusi setiap jenis kulit
    const solusiKulit = [
        {
            jenisKulit: "normal",
            solusi:
                `1. Membersihkan wajah cukup dengan air, ketika kulit wajah dalam keadaan tanpa makeup.\n
                2. Jika kulit wajah dalam keadaan ber-makeup, bisa dibersihkan menggunakan milk cleanser, face tonic, dan facial foam.\n
                3. Bisa menggunakan face tonic dan krim pelembab, ketika musim panas. Karena di musim panas kulit normal akan terasa agak kering.\n
                4. Perawatan facial di klinik kecantikan diperlukan sewaktu-waktu saja, cukup 1 kali dalam 3 bulan.\n
                5. Menggunakan krim tabir surya untuk melindungi dari panas sinar matahari.`
        },
        {
            jenisKulit: "berminyak",
            solusi: 
                `1. Membersihkan wajah menggunakan facial foam, kemudian dibilas sampai bersih.
                2. Setelah mencuci wajah, gunakan face tonic.`
        },
        {
            jenisKulit: "kering",
            solusi: 
                `1. Gunakan krim pelembap sesering mungkin, baik pada siang maupun malam hari.
                2. Gunakan tabir surya pada siang hari, karena kulit kering ini sangat mudah terkena flek kecokelatan.
                3. Jangan terlalu sering menggunakan sabun wajah.`
        },
        {
            jenisKulit: "kombinasi",
            solusi: 
                `1. Gunakan selalu facial foam, milk cleanser dan face tonic.
                2. Lakukan perawatan facial di salon kecantikan sebulan sekali.
                3. Oleskan tipis-tipis krim atau lotion pencegah komedo pada malam hari.`
        },
        {
            jenisKulit: "sensitif",
            solusi: 
                `Berdasarkan gejalanya, perawatan kulit sensitif ditujukan untuk melindungi kulit serta mengurangi dan menanggulangi iritasi. Kulit sensitif tidak dapat diamati secara langsung, diperlukan bantuan dokter kulit atau dermatolog untuk memeriksanya dalam tes alergi-imunologi. Apabila dideteksi alergi, maka biasanya pasien akan diberi beberapa allergen untuk mengetahui kadar sensivitas kulit.`
        }
    ];

    // Agar kode dibawah ini hanya diakses ketika berada pada halaman diagnose.html
    if (window.location.pathname === "/diagnose.html") {
        // Mencari elemen html dengan id gejalaForm dan disimpan ke dalam variabel
        const form = document.getElementById("gejalaForm");
    
        // Buat input select untuk setiap gejala
        gejalaDataset.forEach(item => {
            // Membuat element div
            const div = document.createElement("div");
            div.className = "flex flex-col mb-4";
            
            // Membuat element input select
            const input = document.createElement('select');
            input.id = item.id;
            input.name = 'gejala[]';
            input.className = "border border-gray-300 rounded-md p-2";
            
            // Membuat default opsi dari element select
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = '-- Pilih Jawaban --';
            defaultOption.disabled = true;
            defaultOption.selected = true;
            input.appendChild(defaultOption);
    
            // Membuat opsi-opsi dari element select
            cfInput.forEach(item => {
                const option = document.createElement('option');
                option.value = item.cf;
                option.textContent = item.kondisi;
                input.appendChild(option);
            });
    
            // Membuat label untuk element select
            const label = document.createElement('label');
            label.htmlFor = item.id;
            label.textContent = item.gejala;
            label.className = "mb-2 font-semibold";
    
            // Memasukkan element input dan label ke dalam div
            div.appendChild(label);
            div.appendChild(input);
    
            // Memasukkan element div ke dalam form di html
            form.appendChild(div);
        });
    
        // Tambah tombol untuk menghitung hasil
        const button = document.createElement("button");
        button.textContent = "Hitung Hasil";
        button.type = "button";
        button.className = "bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300";

        // Memasukkan element button ke dalam form di html
        form.appendChild(button);
    
        button.addEventListener("click", () => {
            // Cek apakah semua input <select> sudah terisi
            const allSelects = document.querySelectorAll("select");
            let valid = true;
    
            // Proses pengecekan apakah semua input <select> sudah terisi
            allSelects.forEach(select => {
                if (!select.value) {
                    valid = false;
                }
            });
    
            // Pengkondisian dimana jika nilai valid adalah false akan menampilkan peringatan
            if (!valid) {
                Swal.fire ({
                    title: "Harap Isi Semua Jawaban Sebelum Menghitung Hasil!",
                    icon: "warning"
                });
                return;
            }
    
            // Inisialisasi variabel hasil
            const hasil = {};
        
            // Menghitung total CF untuk setiap jenis kulit
            for (const jenis in pembobotanGejala) {
                let total = 0;
                pembobotanGejala[jenis].forEach(item => {
                    const cf = parseFloat(document.getElementById(item.id).value) || 0;
                    total += cf * item.bobot;
                });
                hasil[jenis] = total / pembobotanGejala[jenis].length;
            }
        
            // Normalisasi hasil agar total mendekati 100%
            const sumHasil = Object.values(hasil).reduce((sum, value) => sum + value, 0);
        
            const hasilNormalisasi = {};
            for (const jenis in hasil) {
                hasilNormalisasi[jenis] = (hasil[jenis] / sumHasil) * 100;
            }

            // Mencari nilai tertinggi diantara ke-lima jenis kulit
            const highest = Object.keys(hasilNormalisasi).reduce((a, b) => hasilNormalisasi[a] > hasilNormalisasi[b] ? a : b);
            
            // Mencari solusi berdasarkan jenis kulit yang didiagnosa
            const solusi = solusiKulit.find(item => item.jenisKulit === highest).solusi;

            // Menampilkan hasil diagnosa dalam bentuk popup
            Swal.fire({
                title: `Tipe Kulit Anda: ${highest}`,
                html: `<h2>Solusi</h2><p>${solusi.replace(/\n/g, '<br>')}</p>`,
                icon: 'info',
                confirmButtonText: 'OK'
            });
        });
    }
});