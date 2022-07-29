import config from '../../config/index';
import './Figure.css';

const { server } = config;
const imageSource = server.serverURL + server.skinFolder + '/';

export default function Figure({ isSelected, figureInfo, onClick }) {
	const { color, figure, style } = figureInfo;
	return (
		<label
			className={isSelected() ? 'selected-figure' : ''}
			onClick={onClick}
			id={`${figure}__${color}__${style}`}>
			<img
				src={`${imageSource}${style}/${color}/${figure}.svg`}
				alt={`${style}`}
			/>
		</label>
	);
}