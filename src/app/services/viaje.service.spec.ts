import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViajeService } from './viaje.service';
import { environment } from 'src/environments/environment';

describe('ViajeService', () => {
  let service: ViajeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de prueba para HttpClient
      providers: [ViajeService] // Proporciona el servicio que se va a probar
    });

    service = TestBed.inject(ViajeService);
    httpMock = TestBed.inject(HttpTestingController); // Controlador para solicitudes HTTP simuladas
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of trips (obtenerViaje)', async () => {
    const mockResponse = [
      { id: 1, destination: 'Paris' },
      { id: 2, destination: 'London' }
    ];
    const token = 'mockToken';

    // Llama al método obtenerViaje
    const resultPromise = service.obtenerViaje(token);

    // Simula la solicitud HTTP GET
    const req = httpMock.expectOne(`${environment.apiUrl}/viaje/obtener?token=${token}`);
    expect(req.request.method).toBe('GET'); // Verifica que sea una solicitud GET
    req.flush(mockResponse); // Devuelve el mockResponse

    // Valida la respuesta
    const result = await resultPromise;
    expect(result).toEqual(mockResponse);
  });

  it('should update the trip status (actualizarEstadoViaje)', async () => {
    const mockResponse = { success: true };
    const idViaje = 1;
    const estado = 'Completado';
    const token = 'mockToken';

    // Llama al método actualizarEstadoViaje
    const resultPromise = service.actualizarEstadoViaje(idViaje, estado, token);

    // Simula la solicitud HTTP POST
    const req = httpMock.expectOne(`${environment.apiUrl}/viaje/actualizar`);
    expect(req.request.method).toBe('POST'); // Verifica que sea una solicitud POST
    expect(req.request.body).toEqual({
      id_viaje: idViaje,
      estado: estado,
      token: token
    }); // Verifica el cuerpo de la solicitud
    req.flush(mockResponse); // Devuelve el mockResponse

    // Valida la respuesta
    const result = await resultPromise;
    expect(result).toEqual(mockResponse);
  });
});
