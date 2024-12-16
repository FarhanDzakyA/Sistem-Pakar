document.addEventListener("DOMContentLoaded", function() {
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
        { id: "1", kondisi: "Tidak Tahu", cf: 0 },
        { id: "2", kondisi: "Kemungkinan", cf: 0.4 },
        { id: "3", kondisi: "Kemungkinan Besar", cf: 0.6 },
        { id: "4", kondisi: "Hampir Pasti", cf: 0.8 },
        { id: "5", kondisi: "Pasti", cf: 1 }
    ];

    const form = document.getElementById("gejalaForm");

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

    console.log(gejalaDataset);
    
    // Contoh akses data untuk jenis kulit normal
    console.log("Pembobotan Gejala Kulit Normal:");
    pembobotanGejala.normal.forEach((item) => {
        console.log(`ID: ${item.id}, Gejala: ${item.gejala}, Bobot: ${item.bobot}`);
    });

    // Contoh akses data untuk jenis kulit berminyak
    console.log("\nPembobotan Gejala Kulit Berminyak:");
    pembobotanGejala.berminyak.forEach((item) => {
        console.log(`ID: ${item.id}, Gejala: ${item.gejala}, Bobot: ${item.bobot}`);
    });

    // Contoh akses data untuk jenis kulit normal
    console.log("Pembobotan Gejala Kulit Normal:");
    pembobotanGejala.kering.forEach((item) => {
        console.log(`ID: ${item.id}, Gejala: ${item.gejala}, Bobot: ${item.bobot}`);
    });

    // Contoh akses data untuk jenis kulit berminyak
    console.log("\nPembobotan Gejala Kulit Berminyak:");
    pembobotanGejala.kombinasi.forEach((item) => {
        console.log(`ID: ${item.id}, Gejala: ${item.gejala}, Bobot: ${item.bobot}`);
    });

    console.log("\nPembobotan Gejala Kulit Berminyak:");
    pembobotanGejala.sensitif.forEach((item) => {
        console.log(`ID: ${item.id}, Gejala: ${item.gejala}, Bobot: ${item.bobot}`);
    });
})