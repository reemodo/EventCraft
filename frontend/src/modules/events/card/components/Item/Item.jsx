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
  const selectedItemSize =
    selectedCardItem && selectedCardItem.uuid === item.uuid
      ? size
      : { width: item.width, height: item.height };
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
          item={{ ...item, ...selectedItemSize }}
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
          item={{ ...item, ...selectedItemSize }}
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
