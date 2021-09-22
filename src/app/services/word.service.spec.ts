import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { WordService } from './word.service';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(WordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test number of response and value', (done) => {
    const words: string[] = ['dog', 'ball', 'window'];
    spyOn(service, 'getWords').and.returnValue(of(words));

    service.getWords().subscribe((words: string[]) => {
      expect(words.length).toBe(3);
      expect(words[0]).toEqual('dog');
      done();
    })
  });
});
