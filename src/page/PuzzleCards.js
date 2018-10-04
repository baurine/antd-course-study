import { Component } from "react";
import { Card, Button } from 'antd';

export default class PuzzleCardsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cardList: [
        {
          id: 1,
          setup: 'Did you hear about the two silk worms in a race?',
          punchline: 'It ended in a tie',
        },
        {
          id: 2,
          setup: 'What happens to a frog\'s car when it breaks down?',
          punchline: 'It gets toad away'
        }
      ]
    }
    this.counter = 100
  }

  addNewCard = () => {
    this.setState(prevState => ({
      cardList: [
        ...prevState.cardList,
        {
          id: this.counter++,
          setup: 'Lorem ipsum...',
          punchline: 'sed do eiusmod...'
        }
      ]
    }))
  }

  render() {
    return (
      <div>
        {
          this.state.cardList.map(card => 
            <Card key={card.id}>
              <div>Q: {card.setup}</div>
              <div>
                <strong>A: {card.punchline}</strong>
              </div>
            </Card>
          )
        }
        <div>
          <Button onClick={this.addNewCard}>添加卡片</Button>
        </div>
      </div>
    )
  }
}
