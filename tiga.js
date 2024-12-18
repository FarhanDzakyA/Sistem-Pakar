

    
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
                    { id: "G001", bobot: 0.8 },
                    { id: "G002", bobot: 0.8 },
                    { id: "G004", bobot: 0.8 },
                    { id: "G005", bobot: 0.8 }
                ],
                berminyak: [
                    { id: "G007", bobot: 0.8 },
                    { id: "G008", bobot: 0.8 },
                    { id: "G009", bobot: 0.8 }
                ],
                kering: [
                    { id: "G010", bobot: 0.8 },
                    { id: "G012", bobot: 0.8 },
                    { id: "G013", bobot: 0.8 }
                ],
                kombinasi: [
                    { id: "G014", bobot: 0.8 },
                    { id: "G015", bobot: 0.8 }
                ],
                sensitif: [
                    { id: "G018", bobot: 0.8 },
                    { id: "G019", bobot: 0.8 }
                ]
            };

            const form = document.getElementById("gejalaForm");

            gejalaDataset.forEach(item => {
                const div = document.createElement("div");
                div.className = "form-group";

                const label = document.createElement("label");
                label.htmlFor = item.id;
                label.textContent = item.gejala;
                
                const select = document.createElement("select");
                select.id = item.id;
                select.name = "gejala[]";

                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = "-- Pilih Jawaban --";
                defaultOption.disabled = true;
                defaultOption.selected = true;
                select.appendChild(defaultOption);

                cfInput.forEach(optionItem => {
                    const option = document.createElement("option");
                    option.value = optionItem.cf;
                    option.textContent = optionItem.kondisi;
                    select.appendChild(option);
                });

                div.appendChild(label);
                div.appendChild(select);
                form.appendChild(div);
            });

            const button = document.createElement("button");
            button.textContent = "Hitung Hasil";
            button.type = "button";
            form.appendChild(button);

            button.addEventListener("click", () => {
                // Validasi input
                let valid = true;
                gejalaDataset.forEach(item => {
                    const value = document.getElementById(item.id).value;
                    if (value === "") {
                        valid = false;
                    }
                });
            
                if (!valid) {
                    alert("Harap pilih semua jawaban sebelum melanjutkan!");
                    return;
                }
            
                // Perhitungan CF
                const hasil = {};
                for (const jenis in pembobotanGejala) {
                    let total = 0;
                    pembobotanGejala[jenis].forEach(item => {
                        const cf = parseFloat(document.getElementById(item.id).value) || 0;
                        total += cf * item.bobot;
                    });
                    hasil[jenis] = total / pembobotanGejala[jenis].length;
                }
            
                const sumHasil = Object.values(hasil).reduce((sum, value) => sum + value, 0);
            
                const hasilNormalisasi = {};
                for (const jenis in hasil) {
                    hasilNormalisasi[jenis] = (hasil[jenis] / sumHasil) * 100;
                }
            
                const recommendationDiv = document.getElementById("recommendation");
                recommendationDiv.innerHTML = `
                    <h3>Hasil Certainty Factor (Normalisasi):</h3>
                    <p><strong>Normal:</strong> ${hasilNormalisasi.normal.toFixed(2)}%</p>
                    <p><strong>Berminyak:</strong> ${hasilNormalisasi.berminyak.toFixed(2)}%</p>
                    <p><strong>Kering:</strong> ${hasilNormalisasi.kering.toFixed(2)}%</p>
                    <p><strong>Kombinasi:</strong> ${hasilNormalisasi.kombinasi.toFixed(2)}%</p>
                    <p><strong>Sensitif:</strong> ${hasilNormalisasi.sensitif.toFixed(2)}%</p>
                `;
            
                let highest = Object.keys(hasilNormalisasi).reduce((a, b) => hasilNormalisasi[a] > hasilNormalisasi[b] ? a : b);
                let rekomendasi = "";
            
                switch (highest) {
                    case "normal":
                        rekomendasi = "Kulit Anda tergolong normal. Disarankan menggunakan pelembab ringan dan produk kosmetik berbahan dasar air.";
                        break;
                    case "berminyak":
                        rekomendasi = "Kulit Anda tergolong berminyak. Disarankan menggunakan produk berbahan non-komedogenik dan menghindari minyak berlebih.";
                        break;
                    case "kering":
                        rekomendasi = "Kulit Anda tergolong kering. Disarankan menggunakan pelembab intensif dan produk berbahan emolien.";
                        break;
                    case "kombinasi":
                        rekomendasi = "Kulit Anda tergolong kombinasi. Disarankan menggunakan produk yang seimbang untuk area berminyak dan kering.";
                        break;
                    case "sensitif":
                        rekomendasi = "Kulit Anda tergolong sensitif. Disarankan menggunakan produk hypoallergenic dan menghindari bahan iritatif.";
                        break;
                }
            
                recommendationDiv.innerHTML += `
                    <div class="result">
                        <h3>Rekomendasi Perawatan:</h3>
                        <p>${rekomendasi}</p>
                    </div>
                `;
            });
        });
   