import { Component } from "react";
import { Card, Button } from 'antd';
import { connect } from 'dva';

const namespace = 'puzzlecards'
const mapStateToProps = (state) => {
  const cardList = state[namespace].data
  return {cardList}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onClickAdd: (newCard) => {
      const action = {
        type: `${namespace}/addNewCard`,
        payload: newCard
      }
      dispatch(action)
    }
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PuzzleCardsPage extends Component {
  constructor(props) {
    super(props)
    this.counter = 100
  }

  addNewCard = () => {
    this.props.onClickAdd(
      {
        setup: 'Lorem ipsum...',
        punchline: 'here we use dva...'
      }
    )
  }

  render() {
    return (
      <div>
        {
          this.props.cardList.map(card => 
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
