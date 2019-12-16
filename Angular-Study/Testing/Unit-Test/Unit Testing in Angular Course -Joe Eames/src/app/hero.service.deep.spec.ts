import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from "./message.service";

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    //let messageService = TestBed.get(MessageService);
    service = TestBed.get(HeroService);
  });

  describe('getHero', () => {
    //it('should call get with the correct Url', inject([HeroService, HttpTestingController], (service: HeroService, controller: HttpTestingController) => {
    it('should call get with the correct Url', () => {
      //service.getHero(3).subscribe();
      service.getHero(4).subscribe(() => {
        console.log('fulfilled');
      });
      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({id: 4, name: 'SuperDude', strength: 100});
      //verify to avoid that there is 2 calling and one is correct URL, one is incorrect URL
      httpTestingController.verify();
    });
  });

});
