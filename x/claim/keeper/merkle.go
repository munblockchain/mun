package keeper

import (
	"bytes"
	"crypto/sha256"
	"errors"
)

func calcSha256(data []byte) []byte {
	s := sha256.Sum256(data)
	return s[:]
}

func VerifyProof(data []byte, hashes [][]byte, root []byte, dirs string) (bool, error) {
	dataHash := calcSha256(data)
	if len(hashes) != len(dirs) {
		return false, errors.New("invalid proof")
	}

	for i, hash := range hashes {
		if dirs[i] == 'R' {
			dataHash = calcSha256(append(dataHash, hash...))
		} else {
			dataHash = calcSha256(append(hash, dataHash...))
		}
	}
	return bytes.Equal(dataHash, root), nil
}
