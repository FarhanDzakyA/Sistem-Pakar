document.addEventListener("DOMContentLoaded", function () {
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

    const cfInput = [
        { kondisi: "Tidak Tahu", cf: 0 },
        { kondisi: "Kemungkinan", cf: 0.4 },
        { kondisi: "Kemungkinan Besar", cf: 0.6 },
        { kondisi: "Hampir Pasti", cf: 0.8 },
        { kondisi: "Pasti", cf: 1 }
    ];

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

    const form = document.getElementById("gejalaForm");

    // Buat input select untuk setiap gejala
    gejalaDataset.forEach(item => {
        const div = document.createElement("div");
        
        const input = document.createElement('select');
        input.id = item.id;
        input.name = 'gejala[]';
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Pilih Jawaban --';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        input.appendChild(defaultOption);

        cfInput.forEach(item => {
            const option = document.createElement('option');
            option.value = item.cf;
            option.textContent = item.kondisi;
            input.appendChild(option);
        });

        const label = document.createElement('label');
        label.htmlFor = item.id;
        label.textContent = item.gejala;

        div.appendChild(input);
        div.appendChild(label);

        form.appendChild(div);
    });

    // Tambah tombol untuk menghitung hasil
    const button = document.createElement("button");
    button.textContent = "Hitung Hasil";
    button.type = "button";
    form.appendChild(button);

    const resultDiv = document.createElement("div");
    form.appendChild(resultDiv);

    button.addEventListener("click", () => {
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
    
        resultDiv.innerHTML = `
            <h3>Hasil Certainty Factor (Normalisasi):</h3>
            <p><strong>Normal:</strong> ${hasilNormalisasi.normal.toFixed(2)}%</p>
            <p><strong>Berminyak:</strong> ${hasilNormalisasi.berminyak.toFixed(2)}%</p>
            <p><strong>Kering:</strong> ${hasilNormalisasi.kering.toFixed(2)}%</p>
            <p><strong>Kombinasi:</strong> ${hasilNormalisasi.kombinasi.toFixed(2)}%</p>
            <p><strong>Sensitif:</strong> ${hasilNormalisasi.sensitif.toFixed(2)}%</p>
        `;
    });
});
