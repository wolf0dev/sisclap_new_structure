import { api } from '../../persistence';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Función helper para verificar si un beneficiario está activo
const isActiveBeneficiario = (beneficiario) => {
  return beneficiario.estatus === 'ACTIVO' || beneficiario.estatus === 'Activo';
};

const reporteService = {
  // Reporte general de beneficiarios y dependientes
  getReporteGeneral: async () => {
    const response = await api.get('/api/reportes/beneficiarios-dependientes');
    const data = response.data;
    // Filtrar solo beneficiarios activos
    return data.filter((item) => isActiveBeneficiario(item.beneficiario));
  },

  // Reporte general filtrado por calle del usuario
  getReporteGeneralByCalle: async (idCalle) => {
    const response = await api.get('/api/reportes/beneficiarios-dependientes');
    const allData = response.data;
    // Filtrar por la calle del usuario y solo beneficiarios activos
    return allData.filter((item) => 
      item.beneficiario.id_calle === idCalle && isActiveBeneficiario(item.beneficiario)
    );
  },

  // Obtener carga familiar por cédula
  getCargaFamiliar: async (cedula) => {
    const response = await api.get(`/api/reportes/beneficiario-dependientes/${cedula}`);
    return response.data;
  },

  // Reporte de habitantes por calle
  getHabitantesCalle: async (idCalle) => {
    const response = await api.get(`/api/reportes/habitantes-calle/${idCalle}`);
    return response.data;
  },

  getHabitantesCallesGeneral: async () => {
    const response = await api.get('/api/reportes/habitantes-calle/');
    return response.data;
  },

  // Reporte por rango de edad
  getRangoEdad: async (edadMin, edadMax) => {
    const response = await api.get(`/api/reportes/rango-edad?min=${edadMin}&max=${edadMax}`);
    return response.data;
  },

  // Reporte por rango de edad filtrado por calle
  getRangoEdadByCalle: async (edadMin, edadMax, idCalle) => {
    const response = await api.get(`/api/reportes/rango-edad?min=${edadMin}&max=${edadMax}`);
    const data = response.data;
    
    // Filtrar personas por calle
    const personasFiltradas = data.personas.filter((persona) => {
      // Verificar si la persona pertenece a la calle especificada
      return persona.id_calle === idCalle;
    });

    return {
      ...data,
      personas: personasFiltradas,
      total: personasFiltradas.length,
      rango: `${edadMin}-${edadMax}`
    };
  },

  // Exportar a Excel para reportes generales
  exportToExcel: (data, fileName, customFileName) => {
    console.log("Exporting to Excel:", data);
    if (!data || data.length === 0) {
      console.warn("No data to export.");
      return;
    }

    // Añadir campo "Jefe de Familia" al beneficiario y "Carga Familiar" a los dependientes
    const excelData = data.flatMap((item) => {
      const beneficiario = {
        ...item.beneficiario,
        Rol: 'Jefe de Familia',
      };
      const dependientes = (item.dependientes || []).map((dep) => ({
        ...dep,
        Rol: 'Carga Familiar',
      }));
      return [beneficiario, ...dependientes];
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Usar nombre personalizado o el nombre del jefe de familia
    const finalFileName = customFileName || (data[0]?.beneficiario?.nombre_apellido || fileName);
    saveAs(blob, `${finalFileName}.xlsx`);
  },

  // Exportar a Excel para reportes de habitantes
  exportHabitantesToExcel: (data, fileName, customFileName) => {
    console.log("Exporting habitants to Excel:", data);
    if (!data || data.length === 0) {
      console.warn("No data to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const finalFileName = customFileName || fileName;
    saveAs(blob, `${finalFileName}.xlsx`);
  },

  // Exportar a PDF para reportes generales
  exportToPDF: (data, columns, title, fileName, customFileName) => {
    console.log("Exporting to PDF:", data);
    if (!data || data.length === 0) {
      console.warn("No data to export.");
      return;
    }

    // Añadir campo "Jefe de Familia" al beneficiario y "Carga Familiar" a los dependientes
    const pdfData = data.flatMap((item) => {
      const beneficiario = {
        ...item.beneficiario,
        Rol: 'Jefe de Familia',
      };
      const dependientes = (item.dependientes || []).map((dep) => ({
        ...dep,
        Rol: 'Carga Familiar',
      }));
      return [beneficiario, ...dependientes];
    });

    const doc = new jsPDF({
      orientation: 'landscape',
    });

    doc.setFontSize(12);
    doc.text(title, 14, 15);
    doc.setFontSize(9);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 20);

    doc.autoTable({
      head: [columns],
      body: pdfData.map(item => columns.map(col => item[col] || '')),
      startY: 25,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 1,
        lineColor: [200, 200, 200],
      },
      headStyles: {
        fillColor: [255, 64, 64],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      margin: { top: 10, right: 5, bottom: 10, left: 5 },
    });

    // Usar nombre personalizado o el nombre del jefe de familia
    const finalFileName = customFileName || (data[0]?.beneficiario?.nombre_apellido || fileName);
    doc.save(`${finalFileName}.pdf`);
  },

  // Exportar a PDF para reportes de habitantes
  exportHabitantesToPDF: (data, columns, title, fileName, customFileName) => {
    console.log("Exporting habitants to PDF:", data);
    if (!data || data.length === 0) {
      console.warn("No data to export.");
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
    });

    doc.setFontSize(12);
    doc.text(title, 14, 15);
    doc.setFontSize(9);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 20);

    doc.autoTable({
      head: [columns],
      body: data.map(item => columns.map(col => item[col] || '')),
      startY: 25,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 1,
        lineColor: [200, 200, 200],
      },
      headStyles: {
        fillColor: [255, 64, 64],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      margin: { top: 10, right: 5, bottom: 10, left: 5 },
    });

    const finalFileName = customFileName || fileName;
    doc.save(`${finalFileName}.pdf`);
  },

  // Exportar a PDF General
  exportToPDFGeneral: (data, tipoVenta) => {
    console.log("Exporting to PDF General:", data);
    if (!data || data.length === 0) {
      console.warn("No data to export.");
      return;
    }

    const doc = new jsPDF();

    data.forEach((calleReporte, index) => {
      const columns = tipoVenta === 'CLAP'
        ? ['Cédula', 'Nombre', 'Casa', 'Cant. Beneficios', 'Ref. Pago', 'Firma']
        : ['Cédula', 'Nombre', 'Casa', 'Cap. Cilindro', 'Cantidad', 'Referencia', 'Firma'];

      const title = `Habitantes de ${calleReporte.calle}`;

      if (index > 0) {
        doc.addPage();
      }

      doc.setFontSize(14);
      doc.text(title, 14, 15);
      doc.setFontSize(11);
      doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 20);

      const tableData = (calleReporte.habitantes || []).map((hab) => [
        hab.cedula,
        hab.nombre_apellido,
        hab.numero_casa,
        ...(tipoVenta === 'CLAP' ? [
          hab.cantidad_beneficios || '',
          hab.referencia_pago || '',
          hab.firma || '',
        ] : [
          hab.capacidad_cilindro || '',
          hab.cantidad || '',
          hab.referencia || '',
          hab.firma || '',
        ]),
      ]);

      doc.autoTable({
        head: [columns],
        body: tableData,
        startY: 30,
        theme: 'grid',
        styles: {
          fontSize: 10,
          cellPadding: 3,
          lineColor: [200, 200, 200],
        },
        headStyles: {
          fillColor: [255, 64, 64],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        margin: { top: 10, right: 5, bottom: 10, left: 5 },
      });
    });

    doc.save('Reporte_General_Ventas.pdf');
  },
};

export default reporteService;