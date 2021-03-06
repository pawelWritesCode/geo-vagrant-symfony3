import Homepage from '../../../pages/Homepage';
import Drawer from '../../../pages/components/Drawer';
import Cities from '../../../pages/Cities';
import { generateString, generateNumber } from '../../../support/Utils';

describe('Delete city test', () => {
  let name;
  let population;

  beforeEach(() => {
    name = generateString();
    population = generateNumber();

    cy.visitPage();
    Homepage.isVisible();
    Drawer.toCities();
  });

  it('Delete city', () => {
    Cities.isVisible();
    Cities.fillCityName(name);
    Cities.fillCityPopulation(population);
    Cities.submit();

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('be.visible');
    cy.xpath(`//li//span[contains(text(), "${population}")]`).should(
      'be.visible',
    );

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');

    // Make sure previous snackbar disappeared
    cy.wait(3000);

    Cities.delete(name);

    cy.wait(1200);

    cy.get('#client-snackbar', { timeout: 10000 })
      .contains('Success!')
      .should('be.visible');

    cy.xpath(`//li//span[contains(text(), "${name}")]`).should('not.exist');
    cy.xpath(`//li//span[contains(text(), "${population}")]`).should(
      'not.exist',
    );
  });
});
