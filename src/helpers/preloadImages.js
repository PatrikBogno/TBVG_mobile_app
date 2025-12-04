import { Asset } from 'expo-asset';
import { AssetKeys } from '../assets/assetKeys';

const preloadImages = async () => {
  const allAssets = Object.values(AssetKeys);

  const imagesToPreload = allAssets.slice(4);

  const tasks = imagesToPreload.map(img =>
    Asset.fromModule(img).downloadAsync()
  );

  await Promise.all(tasks);
};

export default preloadImages;