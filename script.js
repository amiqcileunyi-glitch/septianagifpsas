// Data siswa (simulasi database)
let siswaData = [
    {
        id: 1,
        nis: "2024001",
        nama: "Ahmad Rizki Pratama",
        kelas: "XII",
        jurusan: "TKJ",
        alamat: "Jl. Merdeka No. 10, Jakarta Selatan",
        status: "Aktif"
    },
    {
        id: 2,
        nis: "2024002",
        nama: "Siti Nurhaliza Putri",
        kelas: "XII",
        jurusan: "RPL",
        alamat: "Jl. Sudirman No. 15, Jakarta Pusat",
        status: "Aktif"
    },
    {
        id: 3,
        nis: "2024003",
        nama: "Budi Santoso",
        kelas: "XI",
        jurusan: "MM",
        alamat: "Jl. Diponegoro No. 20, Jakarta Timur",
        status: "Peringatan"
    },
    {
        id: 4,
        nis: "2024004",
        nama: "Dewi Sartika",
        kelas: "X",
        jurusan: "TKJ",
        alamat: "Jl. Gatot Subroto No. 25, Jakarta Barat",
        status: "Aktif"
    },
    {
        id: 5,
        nis: "2024005",
        nama: "Andi Wijaya",
        kelas: "XI",
        jurusan: "TITL",
        alamat: "Jl. Thamrin No. 30, Jakarta Pusat",
        status: "Aktif"
    }
];

// Fungsi untuk menampilkan modal
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Fungsi untuk menutup modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    
    // Reset form jika modal yang ditutup adalah add-siswa
    if (modalId === 'add-siswa') {
        const form = document.getElementById('siswa-form');
        form.reset();
        delete form.dataset.editId;
    }
}

// Fungsi pencarian siswa
function searchSiswa() {
    const searchTerm = document.getElementById('search-siswa').value.toLowerCase();
    const filteredData = siswaData.filter(siswa => 
        siswa.nama.toLowerCase().includes(searchTerm) ||
        siswa.nis.includes(searchTerm) ||
        siswa.kelas.toLowerCase().includes(searchTerm) ||
        siswa.jurusan.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
}

// Fungsi filter kelas
function filterKelas() {
    const selectedKelas = document.getElementById('filter-kelas').value;
    let filteredData = siswaData;
    
    if (selectedKelas) {
        filteredData = siswaData.filter(siswa => siswa.kelas === selectedKelas);
    }
    
    renderTable(filteredData);
}

// Fungsi untuk render tabel
function renderTable(data) {
    const tbody = document.getElementById('siswa-tbody');
    tbody.innerHTML = '';
    
    data.forEach((siswa, index) => {
        const statusClass = siswa.status === 'Aktif' ? 'active' : 'warning';
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${siswa.nis}</td>
                <td>${siswa.nama}</td>
                <td>${siswa.kelas}</td>
                <td>${siswa.jurusan}</td>
                <td>${siswa.alamat}</td>
                <td><span class="status ${statusClass}">${siswa.status}</span></td>
                <td>
                    <button class="btn-edit" onclick="editSiswa(${siswa.id})">✏️ Edit</button>
                    <button class="btn-view" onclick="viewSiswa(${siswa.id})">👁️ Lihat</button>
                    <button class="btn-delete" onclick="deleteSiswa(${siswa.id})">🗑️ Hapus</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Fungsi edit siswa
function editSiswa(id) {
    const siswa = siswaData.find(s => s.id === id);
    if (siswa) {
        // Isi form dengan data siswa
        document.getElementById('nis').value = siswa.nis;
        document.getElementById('nama').value = siswa.nama;
        document.getElementById('kelas').value = siswa.kelas;
        document.getElementById('jurusan').value = siswa.jurusan;
        document.getElementById('alamat').value = siswa.alamat;
        
        // Simpan ID untuk update
        document.getElementById('siswa-form').dataset.editId = id;
        
        showModal('add-siswa');
    }
}

// Fungsi lihat detail siswa
function viewSiswa(id) {
    const siswa = siswaData.find(s => s.id === id);
    if (siswa) {
        const detailHtml = `
            <div class="siswa-detail">
                <div class="detail-row">
                    <strong>NIS:</strong> ${siswa.nis}
                </div>
                <div class="detail-row">
                    <strong>Nama Lengkap:</strong> ${siswa.nama}
                </div>
                <div class="detail-row">
                    <strong>Kelas:</strong> ${siswa.kelas}
                </div>
                <div class="detail-row">
                    <strong>Jurusan:</strong> ${siswa.jurusan}
                </div>
                <div class="detail-row">
                    <strong>Alamat:</strong> ${siswa.alamat}
                </div>
                <div class="detail-row">
                    <strong>Status:</strong> <span class="status ${siswa.status === 'Aktif' ? 'active' : 'warning'}">${siswa.status}</span>
                </div>
            </div>
        `;
        document.getElementById('siswa-detail').innerHTML = detailHtml;
        showModal('view-siswa');
    }
}

// Fungsi hapus siswa
function deleteSiswa(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
        siswaData = siswaData.filter(s => s.id !== id);
        renderTable(siswaData);
        alert('Data siswa berhasil dihapus!');
    }
}

// Fungsi submit form
function submitForm(event) {
    event.preventDefault();
    
    const form = document.getElementById('siswa-form');
    const editId = form.dataset.editId;
    
    const siswaInfo = {
        nis: document.getElementById('nis').value,
        nama: document.getElementById('nama').value,
        kelas: document.getElementById('kelas').value,
        jurusan: document.getElementById('jurusan').value,
        alamat: document.getElementById('alamat').value,
        status: 'Aktif'
    };
    
    if (editId) {
        // Update siswa
        const index = siswaData.findIndex(s => s.id == editId);
        if (index !== -1) {
            siswaData[index] = { ...siswaData[index], ...siswaInfo };
            alert('Data siswa berhasil diperbarui!');
        }
        delete form.dataset.editId;
    } else {
        // Tambah siswa baru
        const newId = Math.max(...siswaData.map(s => s.id)) + 1;
        siswaData.push({ id: newId, ...siswaInfo });
        alert('Data siswa berhasil ditambahkan!');
    }
    
    form.reset();
    closeModal('add-siswa');
    renderTable(siswaData);
}

// Data pelanggaran (simulasi database)
let pelanggaranData = [
    {
        id: 1,
        tanggal: "19/12/2024",
        nis: "2024001",
        nama: "Ahmad Rizki Pratama",
        kelas: "XII TKJ 1",
        jenis: "Terlambat",
        tingkat: "Ringan",
        sanksi: "Teguran lisan dan membersihkan kelas",
        status: "Selesai"
    },
    {
        id: 2,
        tanggal: "18/12/2024",
        nis: "2024003",
        nama: "Budi Santoso",
        kelas: "XI MM 2",
        jenis: "Tidak berseragam",
        tingkat: "Sedang",
        sanksi: "Teguran tertulis dan panggilan orang tua",
        status: "Proses"
    },
    {
        id: 3,
        tanggal: "17/12/2024",
        nis: "2024002",
        nama: "Siti Nurhaliza Putri",
        kelas: "XII RPL 1",
        jenis: "Tidak mengerjakan tugas",
        tingkat: "Ringan",
        sanksi: "Mengerjakan tugas tambahan",
        status: "Selesai"
    }
];

// Fungsi untuk pelanggaran
function loadPelanggaranTable() {
    renderPelanggaranTable(pelanggaranData);
}

function renderPelanggaranTable(data) {
    const tbody = document.querySelector('#pelanggaran-table tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    data.forEach((pelanggaran, index) => {
        const statusClass = pelanggaran.status === 'Selesai' ? 'selesai' : 'proses';
        const tingkatClass = pelanggaran.tingkat.toLowerCase();
        
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${pelanggaran.tanggal}</td>
                <td>${pelanggaran.nis}</td>
                <td>${pelanggaran.nama}</td>
                <td>${pelanggaran.kelas}</td>
                <td>${pelanggaran.jenis}</td>
                <td><span class="level ${tingkatClass}">${pelanggaran.tingkat}</span></td>
                <td>${pelanggaran.sanksi}</td>
                <td><span class="status ${statusClass}">${pelanggaran.status}</span></td>
                <td>
                    <button class="btn-view" onclick="viewPelanggaran(${pelanggaran.id})">👁️</button>
                    <button class="btn-edit" onclick="editPelanggaran(${pelanggaran.id})">✏️</button>
                    <button class="btn-delete" onclick="deletePelanggaran(${pelanggaran.id})">🗑️</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function searchPelanggaran() {
    const searchTerm = document.getElementById('search-pelanggaran').value.toLowerCase();
    const filteredData = pelanggaranData.filter(pelanggaran => 
        pelanggaran.nama.toLowerCase().includes(searchTerm) ||
        pelanggaran.nis.includes(searchTerm) ||
        pelanggaran.jenis.toLowerCase().includes(searchTerm) ||
        pelanggaran.kelas.toLowerCase().includes(searchTerm)
    );
    renderPelanggaranTable(filteredData);
}

function filterJenisPelanggaran() {
    const selectedJenis = document.getElementById('filter-jenis').value;
    let filteredData = pelanggaranData;
    
    if (selectedJenis) {
        filteredData = pelanggaranData.filter(pelanggaran => pelanggaran.jenis === selectedJenis);
    }
    
    renderPelanggaranTable(filteredData);
}

function filterTanggalPelanggaran() {
    const selectedDate = document.getElementById('filter-tanggal').value;
    if (!selectedDate) {
        renderPelanggaranTable(pelanggaranData);
        return;
    }
    
    const formattedDate = new Date(selectedDate).toLocaleDateString('id-ID');
    const filteredData = pelanggaranData.filter(pelanggaran => 
        pelanggaran.tanggal === formattedDate
    );
    renderPelanggaranTable(filteredData);
}

function editPelanggaran(id) {
    const pelanggaran = pelanggaranData.find(p => p.id === id);
    if (pelanggaran) {
        alert('Fitur edit pelanggaran akan segera tersedia. ID: ' + id);
    }
}

function deletePelanggaran(id) {
    if (confirm('Apakah Anda yakin ingin menghapus data pelanggaran ini?')) {
        pelanggaranData = pelanggaranData.filter(p => p.id !== id);
        renderPelanggaranTable(pelanggaranData);
        alert('Data pelanggaran berhasil dihapus!');
    }
}

function loadSiswaSelect() {
    const select = document.getElementById('siswa-select');
    if (!select) return;
    
    select.innerHTML = '<option value="">Pilih Siswa</option>';
    
    siswaData.forEach(siswa => {
        const option = document.createElement('option');
        option.value = siswa.nis;
        option.textContent = `${siswa.nis} - ${siswa.nama} (${siswa.kelas} ${siswa.jurusan})`;
        select.appendChild(option);
    });
}

function loadSampleData() {
    console.log('Sample data loaded');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Render tabel awal untuk halaman siswa
    if (document.getElementById('siswa-tbody')) {
        renderTable(siswaData);
    }
    
    // Render tabel awal untuk halaman pelanggaran
    if (document.getElementById('pelanggaran-table')) {
        loadPelanggaranTable();
        loadSiswaSelect();
        
        // Event listeners untuk pencarian dan filter pelanggaran
        const searchInput = document.getElementById('search-pelanggaran');
        if (searchInput) {
            searchInput.addEventListener('input', searchPelanggaran);
        }
        
        const filterJenis = document.getElementById('filter-jenis');
        if (filterJenis) {
            filterJenis.addEventListener('change', filterJenisPelanggaran);
        }
        
        const filterTanggal = document.getElementById('filter-tanggal');
        if (filterTanggal) {
            filterTanggal.addEventListener('change', filterTanggalPelanggaran);
        }
    }
    
    // Event listener untuk form siswa
    const siswaForm = document.getElementById('siswa-form');
    if (siswaForm) {
        siswaForm.addEventListener('submit', submitForm);
    }
    
    // Event listener untuk form pelanggaran
    const pelanggaranForm = document.getElementById('pelanggaran-form');
    if (pelanggaranForm) {
        pelanggaranForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const siswaSelect = document.getElementById('siswa-select');
            const selectedOption = siswaSelect.selectedOptions[0];
            const siswaText = selectedOption.text;
            
            const newPelanggaran = {
                id: Math.max(...pelanggaranData.map(p => p.id)) + 1,
                tanggal: new Date(document.getElementById('tanggal').value).toLocaleDateString('id-ID'),
                nis: document.getElementById('siswa-select').value,
                nama: siswaText.split(' - ')[1].split(' (')[0],
                kelas: siswaText.split('(')[1].replace(')', ''),
                jenis: document.getElementById('jenis-pelanggaran').value,
                tingkat: document.getElementById('tingkat-pelanggaran').value,
                sanksi: document.getElementById('sanksi').value,
                status: document.getElementById('status-sanksi').value
            };
            
            pelanggaranData.push(newPelanggaran);
            renderPelanggaranTable(pelanggaranData);
            closeModal('add-pelanggaran');
            pelanggaranForm.reset();
            alert('Data pelanggaran berhasil ditambahkan!');
        });
    }
    
    // Event listener untuk menutup modal ketika klik di luar
    window.onclick = function(event) {
        const modals = document.getElementsByClassName('modal');
        for (let modal of modals) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    }
    
    // Reset form ketika modal ditutup
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const siswaForm = document.getElementById('siswa-form');
            if (siswaForm) {
                siswaForm.reset();
                delete siswaForm.dataset.editId;
            }
            
            const pelanggaranForm = document.getElementById('pelanggaran-form');
            if (pelanggaranForm) {
                pelanggaranForm.reset();
            }
        });
    });
});