describe('Cek makna kata di KBBI', () => {
  
    beforeEach(() => {
      cy.fixture('kata').as('dataKata'); // Memuat data kata dari fixture
    });
  
    it('Mencari dan menampilkan makna setiap kata di https://kbbi.web.id', function () {
      this.dataKata.kata.forEach((kata) => {
        cy.visit(`https://www.kbbi.web.id/${kata}`); // Mengunjungi halaman KBBI untuk setiap kata
  
        cy.get('body').then(($body) => {
          if ($body.find('.arti').length > 0) { // Memeriksa apakah elemen dengan kelas .arti ada
            cy.get('.arti').first().then(($arti) => {
              const arti = $arti.text(); // Mengambil teks makna
              cy.log(`Makna dari kata "${kata}": ${arti}`); // Menampilkan makna di log
            });
          } else {
            cy.log(`Kata "${kata}" tidak ditemukan di KBBI.`); // Menampilkan pesan jika kata tidak ditemukan
          }
        });
      });
    });
  });
  
