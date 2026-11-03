import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketCountStatusDto } from '../../../../domain/dto/ticketResponse.dto';
import { TicketCountMesDto } from '../../../../domain/dto/ticketResponse.dto';
import { TicketService } from '../../../services/remoto/ticket/ticket.service';
import { DashboardService } from '../../../services/remoto/dashboard/dashboard.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexDataLabels,
  ApexResponsive
} from 'ng-apexcharts';
import { aniosList, areaCantConsumible, nroParteCant } from '../../../../domain/dto/dashboardResponse.dto';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
};

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  colors: string[];
};

export type FilaMatriz = {
  area: string;
  sede: string;
  valores: (number | null)[];
  total: number;
};

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  public chartOptions!: ChartOptions;
  public donutChartOptions!: DonutChartOptions;

  categorias_mes: string[] = [];
  series_mes_cant: number[] = [];

  totalSolicitudes: number = 0;
  totalPendentes: number = 0;
  totalAlmacen: number = 0;
  totalFinalizados: number = 0;
  totalRechazados: number = 0;

  sedeSeleccionada: string = '';
  areaSeleccionada: string = '';
  tipoSeleccionado: string = '';

  nroParteCant: nroParteCant[] = [];
  nroParteCantTemp: nroParteCant[] = [];

  sedes: string[] = [];
  areas: string[] = [];
  tipos: string[] = [];

  datosOriginales: areaCantConsumible[] = [];

  anioActual = new Date().getFullYear().toString();
  listAnios: aniosList[] = [];

  anioSelected: string = new Date().getFullYear().toString();

  constructor(
    private ticketService: TicketService,
    private dashboardService: DashboardService
  ) { }

  columnas = [
    'Tóner',
    'Tóner',
    'Cartucho',
    'Cinta',
    'Tóner',
    'Kit',
    'Canon',
    'Tóner',
    'Tambor',
    'Xerox'
  ];

  datos: FilaMatriz[] = [];

  consumibles = [];

  ngOnInit(): void {
  
    this.getAniosList()
  }

  
  getAniosList() {
    this.dashboardService.getAniosList().subscribe({
        next: (data: aniosList[]) => {
            this.listAnios = data;

            const existeAnioActual = data.some(
                item => item.anio.toString() === this.anioSelected
            );

            if (existeAnioActual) {
                this.cambiarAnio(this.anioSelected);
            } else if (data.length > 0) {
                this.anioSelected = data[0].anio.toString();
                this.cambiarAnio(this.anioSelected);
            }
        },
        error: (err) => {
            console.error('Error obteniendo años', err);
        }
    });
}

  cambiarAnio(anio: string): void {
    this.anioSelected = anio;

    this.getCountStatus();
    this.getCountMes();
    this.getAreaCantConsumible();
    this.getNroParteCant();
}

  configurarGraficoBarras(cant: number[], categorias: string[]): void {

    this.chartOptions = {
      series: [
        {
          name: 'Solicitudes',
          data: cant
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Cant. de Solicitudes Mensuales'
      },
      xaxis: {
        categories: categorias
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10
        }
      }
    };

  }

  configurarGraficoDonut(
    totalSolicitudes: number,
    pendientes: number,
    almacen: number,
    finalizados: number,
    rechazados: number
  ): void {

    this.donutChartOptions = {
      series: [
        pendientes,
        almacen,
        finalizados,
        rechazados
      ],
      chart: {
        type: 'donut',
        height: 350
      },
      labels: [
        'Pendientes',
        'En Almacén',
        'Finalizados',
        'Rechazados'
      ],
      title: {
        text: 'Estado de Solicitudes'
      },
      legend: {
        position: 'bottom'
      },
      dataLabels: {
        enabled: true
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                formatter: () => totalSolicitudes.toString()
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      colors: [
        '#f59e0b',
        '#3b82f6',
        '#10b981',
        '#ef4444'
      ]
    };

  }


  getCountStatus() {
    this.ticketService.getCountStatus(this.anioSelected).subscribe({
      next: (data: TicketCountStatusDto) => {
        console.log('data:', data);
        this.totalSolicitudes = data.total_solicitudes;
        this.totalPendentes = data.total_pendientes;
        this.totalAlmacen = data.total_almacen;
        this.totalFinalizados = data.total_finalizados;
        this.totalRechazados = data.total_rechazados;
        console.log('totalSolicitudes:', this.totalSolicitudes);
        console.log('totalPendentes:', this.totalPendentes);
        console.log('totalAlmacen:', this.totalAlmacen);
        console.log('totalFinalizados:', this.totalFinalizados);
        console.log('totalRechazados:', this.totalRechazados);

        this.configurarGraficoDonut(
          Number(this.totalSolicitudes),
          Number(this.totalPendentes),
          Number(this.totalAlmacen),
          Number(this.totalFinalizados),
          Number(this.totalRechazados)
        );
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllAlmacen completo");
      }
    });
  }

  getCountMes() {
    this.ticketService.getCountMes(this.anioSelected).subscribe({
      next: (data: TicketCountMesDto[]) => {
        console.log('data:', data);
        this.categorias_mes = data.map(item => item.mes);
        this.series_mes_cant = data.map(item => item.cantidad);
        this.configurarGraficoBarras(this.series_mes_cant, this.categorias_mes);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllAlmacen completo");
      }
    });
  }

  getAreaCantConsumible() {
    this.dashboardService.getAreaCantConsumible(this.anioSelected).subscribe({
      next: (data: areaCantConsumible[]) => {
        this.datosOriginales = data;
        this.cargarDatos(data);
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllAlmacen completo");
      }
    });
  }

  generarMatriz(data: areaCantConsumible[]): void {
    this.columnas = [
      ...new Set(data.map(item => item.tipo_consumible))
    ];

    const agrupado = new Map<string, {
      sede: string;
      area: string;
      cantidades: Map<string, number>;
    }>();

    data.forEach(item => {
      const clave = `${item.sede}|${item.area}`;

      if (!agrupado.has(clave)) {
        agrupado.set(clave, {
          sede: item.sede,
          area: item.area,
          cantidades: new Map<string, number>()
        });
      }

      const fila = agrupado.get(clave)!;

      const cantidadActual =
        fila.cantidades.get(item.tipo_consumible) ?? 0;

      fila.cantidades.set(
        item.tipo_consumible,
        cantidadActual + Number(item.cantidad)
      );
    });

    this.datos = Array.from(agrupado.values()).map(fila => {

      const valores: (number | null)[] = this.columnas.map(tipo =>
        fila.cantidades.get(tipo) ?? null
      );

      const total = valores.reduce<number>(
        (acumulado, valor) => acumulado + (valor ?? 0),
        0
      );

      return {
        area: fila.area,
        sede: fila.sede,
        valores,
        total
      };
    });
  }

  cargarDatos(data: areaCantConsumible[]): void {

    this.sedes = [...new Set(data.map(item => item.sede))];
    this.tipos = [...new Set(data.map(item => item.tipo_consumible))];

    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const filtrados = this.datosOriginales.filter(item => {
      const coincideSede =
        !this.sedeSeleccionada ||
        item.sede === this.sedeSeleccionada;

      const coincideArea =
        !this.areaSeleccionada ||
        item.area === this.areaSeleccionada;

      const coincideTipo =
        !this.tipoSeleccionado ||
        item.tipo_consumible === this.tipoSeleccionado;

      return coincideSede && coincideArea && coincideTipo;
    });

    this.generarMatriz(filtrados);
  }
  actualizarAreas(): void {
    const datos = this.sedeSeleccionada
      ? this.datosOriginales.filter(
        item => item.sede === this.sedeSeleccionada
      )
      : this.datosOriginales;

    this.areas = [
      ...new Set(datos.map(item => item.area))
    ];

    this.areaSeleccionada = '';

    this.aplicarFiltros();
  }

  cambiarSede(): void {
    this.actualizarAreas();
  }

  cambiarArea(): void {
    this.aplicarFiltros();
  }

  cambiarTipo(): void {
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.sedeSeleccionada = '';
    this.areaSeleccionada = '';
    this.tipoSeleccionado = '';

    this.areas = [
      ...new Set(this.datosOriginales.map(item => item.area))
    ];

    this.aplicarFiltros();
  }

  // CANTIDAD DE CONSUMIBLES POR NRO DE PARTE
  getNroParteCant() {
    this.dashboardService.getNroParteCant(this.anioSelected).subscribe({
      next: (data: nroParteCant[]) => {
        this.nroParteCant = data;
        this.nroParteCantTemp = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllAlmacen completo");
      }
    });

  }

  // BUSCAR EN OBJETO 
  buscarEnObjeto(event: any): void {
    const textoBusqueda = event.target.value.toLowerCase().trim();
    this.nroParteCant = this.nroParteCantTemp.filter((item: nroParteCant) => {
      const tipoConsumible = item.tipo_consumible.toLowerCase().includes(textoBusqueda);
      const nroParte = item.nro_parte.toLowerCase().includes(textoBusqueda);
      const marca = item.marca.toLowerCase().includes(textoBusqueda);
      return tipoConsumible || nroParte || marca;
    });

  }

  // EXPORTAR A EXCEL
  exportToExcel(): void {
    const encabezados = [
      'Área / Consumible',
      ...this.columnas,
      'Total'
    ];

    const filas = this.datos.map(fila => [
      `${fila.area}\n${fila.sede}`,
      ...fila.valores.map(valor => valor ?? '-'),
      fila.total
    ]);

    const data = [
      encabezados,
      ...filas
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    // Ancho de columnas
    worksheet['!cols'] = [
      { wch: 30 },
      ...this.columnas.map(() => ({ wch: 15 })),
      { wch: 12 }
    ];

    const workbook: XLSX.WorkBook = {
      Sheets: {
        'Matriz de Consumibles': worksheet
      },
      SheetNames: ['Matriz de Consumibles']
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const file = new Blob(
      [excelBuffer],
      {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

    saveAs(file, `matriz_consumibles_${this.anioSelected}.xlsx`);
  }

  exportToExcelNroParte(): void {
    const encabezados = [
      'Marca',
      'Nro de Parte',
      'Tipo de Consumible',
      'Cantidad',
      'Porcentaje'
    ];

    const filas = this.nroParteCant.map(fila => [
      fila.marca,
      fila.nro_parte,
      fila.tipo_consumible,
      fila.cantidad,
      `${Number(fila.porcentaje).toFixed(2)}%`
    ]);

    const data = [
      encabezados,
      ...filas
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    worksheet['!cols'] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 25 },
      { wch: 12 },
      { wch: 15 }
    ];

    const workbook: XLSX.WorkBook = {
      Sheets: {
        'Consumibles': worksheet
      },
      SheetNames: ['Consumibles']
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const file = new Blob(
      [excelBuffer],
      {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    );

    saveAs(file, `consumibles_nro_parte_${this.anioSelected}.xlsx`);
  }



}