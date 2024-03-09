import { ItemTypes } from "../CardEdit/CardEdit";
import { CardItemWrapper } from "../CardItemWrapper/CardItemWrapper";
import { Image } from "../Image/Image";
import { Shape } from "../Shape/Shape";
import { Text } from "../Text/Text";

export const Item = ({
  item,
  selectedCardItem,
  text,
  onTextChange,
  onClick,
  onResize,
  size,
  onDeleteItem,
}) => {
  return (
    <>
      {item.type === ItemTypes.TEXT && (
        <Text
          item={item}
          selectedCardItem={selectedCardItem}
          text={text}
          onTextChange={onTextChange}
        />
      )}

      {item.type === ItemTypes.IMAGE && (
        <CardItemWrapper
          item={{ ...item, ...size }}
          onChange={onResize}
          selectedItem={selectedCardItem}
          onClick={onClick}
          onDelete={onDeleteItem}
        >
          <Image item={item} />
        </CardItemWrapper>
      )}

      {item.type === ItemTypes.SHAPE && (
        <CardItemWrapper
          item={{ ...item, ...size }}
          onChange={onResize}
          selectedItem={selectedCardItem}
          onClick={onClick}
          onDelete={onDeleteItem}
        >
          <Shape item={item} />
        </CardItemWrapper>
      )}
    </>
  );
};
