import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WordSearchComponent } from "./word-search.component";

describe("WordSearchComponent", () => {
  let component: WordSearchComponent;
  let fixture: ComponentFixture<WordSearchComponent>;

  const gridsList: string[][] = [
    ["C", "P", "K", "X", "O", "I", "G", "H", "S", "F", "C", "H"],
    ["Y", "G", "W", "R", "I", "A", "H", "C", "Q", "R", "X", "K"],
    ["M", "A", "X", "I", "M", "I", "Z", "A", "T", "I", "O", "N"],
    ["E", "T", "W", "Z", "N", "L", "W", "G", "E", "D", "Y", "W"],
    ["M", "C", "L", "E", "L", "D", "N", "V", "L", "G", "P", "T"],
    ["O", "J", "A", "A", "V", "I", "O", "T", "E", "E", "P", "X"],
    ["C", "D", "B", "P", "H", "I", "A", "W", "V", "X", "U", "I"],
    ["L", "G", "O", "S", "S", "B", "R", "Q", "I", "A", "P", "K"],
    ["E", "O", "I", "G", "L", "P", "S", "D", "S", "F", "W", "P"],
    ["W", "F", "K", "E", "G", "O", "L", "F", "I", "F", "R", "S"],
    ["O", "T", "R", "U", "O", "C", "D", "O", "O", "F", "T", "P"],
    ["C", "A", "R", "P", "E", "T", "R", "W", "N", "G", "V", "Z"],
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WordSearchComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("test search2D word found", () => {
    const word: string = 'BALL';

    // start position (6,2), grid size (12, 12)
    const found = component.search2D(gridsList, 6, 2, word, 12, 12);
    expect(found.length).toBe(2);

    expect(found).toEqual([3, 5]);

  });

  it("test search2D word found", () => {
    const word: string = 'BALL';

    const found = component.search2D(gridsList, 0, 0, word, 12, 12);
    expect(found.length).toBe(0);

    expect(found).toEqual([]);
  });

  it("test searchWord on empty grid", () => {
    component.searchWord();
    expect(component.message).toEqual('Empty Grid');
  });
});
