Feature: #1, #3, #4, #11
Eu como usuário gostaria de adicionar itens na lista de compras para controlar o que precisa ser comprado para o estabelecimento
Eu como usuário gostaria de gerenciar quantidades dos itens para realizar um controle melhor do preço final
Eu como usuário gostaria de gerenciar supermercados para poder relacionar as listas aos supermercados
Eu como usuário gostaria de gerenciar itens para poder adicioná-los a listas posteriormente

    Scenario: Adding item to new list
        Given I don't have a list
        When I try adding an item to the list
        Then I have a list with 1 elements

    Scenario: Adding item to existing list
        Given I have a list with 1 element
        When I try adding an item to the list
        Then I have a list with 2 elements

    Scenario: Removing item from existing list
        Given I have a list with 1 element
        When I try removing an item to the list
        Then I have a list with 0 elements

    Scenario: Deleting a list
        Given I have a list with 1 element
        When I delete the list
        Then I have a list with 0 elements

Feature: #2
Eu como usuário gostaria de saber o valor da lista de compra por supermercado para poder comparar os valores entre eles

    Scenario: Calculating total
        Given I have a supermarket bastket
        And I added 1 $3 item to it
        And I added 1 $5 item to it
        When I calculate the result
        Then I calculated $8

Feature: #5
Eu como usuário gostaria de acrescentar os preços por item ao aplicativo para estimar o valor final das listas

    Scenario: Setting price
        Given I have 2 items of the same
        When I set its price to $3
        Then I pay $6

Feature: #6, #8
Eu como usuário gostaria de saber a lista de menor valor em um único supermercado para decidir onde realizar as compras
Eu como usuário gostaria de saber o supermercado com o menor preço médio para realizar decisões futuras

    Scenario: Minimum supermarket list
        Given I want calculate the minimum supermarket list
        When I have a list from "A" that costs $3
        And  I have a list from "B" that costs $4
        And  I have a list from "D" that costs $2
        And  I have a list from "C" that costs $5
        Then the list is from supermarket "D"

Feature: #7
Eu como usuário gostaria de saber a lista de menor valor entre todos os supermercados cadastrados para decidir onde realizar as compras

    Scenario: Minimum product list
        Given I want calculate the minimum product list
        When I have a product "X" from "A" that costs $3
        And  I have a product "X" from "B" that costs $2
        And  I have a product "Y" from "A" that costs $4
        And  I have a product "Y" from "B" that costs $5
        Then I get product "X" from "B"
        And  I get product "Y" from "A"

Feature: #9
Eu como usuário gostaria de gerar um relatório sobre as minhas listas para manter um histórico de itens e valores

    Scenario: Historic
        Given 2 days ago I paid $30 for "x" on "y"
        And   1 days ago I paid $20 for "x" on "y"
        And   0 days ago I paid $10 for "x" on "y"
        When I get the report
        Then I see that "x" on "y" was $10 0 days ago
        And  I see that "x" on "y" was $20 1 days ago
        And  I see that "x" on "y" was $30 2 days ago

Feature: #10
Eu como usuário gostaria de compartilhar em uma rede social uma lista com valores por item e valor final

    Scenario: Sharing
        Given I went to a random market
        When I click "Share"
        Then it requests some API to publish some text


Feature: #12
Eu como usuário gostaria de marcar os itens que já foram comprados para não me perder entre os mercados.

    Scenario: Ticking
        Given I have a tickable
        When I tick it
        Then it gets ticked
